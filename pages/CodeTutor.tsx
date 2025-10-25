import React, { useState, useContext, useCallback, useMemo, useEffect } from 'react';
import AIFeedback from '../components/AIFeedback';
import AnalysisLoader from '../components/AnalysisLoader';
import ExecutionOutput from '../components/ExecutionOutput';
import CodeEditor from '../components/CodeEditor';
import { analyzeCodeStream, getPredictedOutputAndCheckTask } from '../services/geminiService';
import { executeCode } from '../services/executionService';
import type { Language, Difficulty, RoadmapItem, AppContextType } from '../types';
import { AppContext } from '../context/AppContext';
import ResizablePanels from '../components/ResizablePanels';
import { PYTHON_PATH_DATA, BEGINNER_SAMPLE_CODE, PLACEHOLDER_CODE } from '../constants';

type AnalysisStatus = 'idle' | 'loading' | 'streaming' | 'complete' | 'error';
type ExecutionStatus = 'idle' | 'running' | 'success' | 'error';
type AnalysisMode = 'analyze' | 'refactor';
type ActivityType = 'analyze' | 'enhance' | 'execute';

const SUCCESS_MARKER = '[TASK_SUCCESS]';

// Helper to check if two timestamps are in the same week (Sun-Sat)
const isSameWeek = (ts1: number, ts2: number) => {
    if (ts2 === 0) return true; // First-ever activity is always in the current week
    const d1 = new Date(ts1);
    const d2 = new Date(ts2);
    // Move date to the Sunday of its week
    d1.setDate(d1.getDate() - d1.getDay());
    d2.setDate(d2.getDate() - d2.getDay());
    // Compare just the date part
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
    return d1.getTime() === d2.getTime();
};

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

const normalizeCode = (code: string): string => {
  return code.replace(/\s+/g, '');
};

const selectRandomSnippet = (lang: Language) => {
    const samples = BEGINNER_SAMPLE_CODE[lang];
    return samples[Math.floor(Math.random() * samples.length)];
}

const CodeTutor: React.FC = () => {
  const [analysisStatus, setAnalysisStatus] = useState<AnalysisStatus>('idle');
  const [feedback, setFeedback] = useState<string>('');
  const [analysisError, setAnalysisError] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');
  
  const [executionStatus, setExecutionStatus] = useState<ExecutionStatus>('idle');
  const [executionOutput, setExecutionOutput] = useState('');
  const [executionError, setExecutionError] = useState('');
  
  const [completedTask, setCompletedTask] = useState<RoadmapItem | null>(null);

  const [analysisMode, setAnalysisMode] = useState<AnalysisMode>('analyze');

  const { setPoints, setAnalytics, analytics, codeToLoad, setCodeToLoad, setCurrentPage } = useContext(AppContext) as AppContextType;

  // --- Lifted State from CodeEditor ---
  const [history, setHistory] = useState<string[]>([selectRandomSnippet('Python')]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const code = useMemo(() => history[historyIndex] || '', [history, historyIndex]);

  const [language, setLanguage] = useState<Language>('Python');
  const [difficulty, setDifficulty] = useState<Difficulty>('Beginner');
  const [currentTask, setCurrentTask] = useState<RoadmapItem | null>(null);

  const flatPythonPath = useMemo(() => PYTHON_PATH_DATA.flatMap(section => section.items), []);

  const handleClearUI = useCallback(() => {
    setAnalysisStatus('idle');
    setFeedback('');
    setAnalysisError('');
    setExecutionStatus('idle');
    setExecutionOutput('');
    setExecutionError('');
    setCompletedTask(null);
    setAnalysisMode('analyze');
  }, []);

  // --- Lifted Handlers from CodeEditor ---
  const setCodeAndHistory = useCallback((newCode: string) => {
    setHistory(prevHistory => {
        const newHistorySlice = prevHistory.slice(0, historyIndex + 1);
        const updatedHistory = [...newHistorySlice, newCode];
        setHistoryIndex(updatedHistory.length - 1);
        return updatedHistory;
    });
  }, [historyIndex]);
  
  const setCodeFromHistory = useCallback((newIndex: number) => {
    setHistory(prevHistory => {
        if (newIndex >= 0 && newIndex < prevHistory.length) {
            setHistoryIndex(newIndex);
        }
        return prevHistory;
    });
  }, []);

  const resetEditorContent = useCallback((newCode: string) => {
    setHistory([newCode]);
    setHistoryIndex(0);
  }, []);

  const handleLanguageChange = useCallback((lang: Language) => {
    setLanguage(lang);
    if (!currentTask) {
        resetEditorContent(selectRandomSnippet(lang));
    }
  }, [currentTask, resetEditorContent]);

  const clearTask = useCallback(() => {
    setCurrentTask(null);
    setCodeToLoad(null);
    resetEditorContent(PLACEHOLDER_CODE[language]);
  }, [language, resetEditorContent, setCodeToLoad]);

  const handleLoadSample = useCallback(() => {
    setCurrentTask(null);
    setCodeToLoad(null);
    resetEditorContent(selectRandomSnippet(language));
    handleClearUI();
  }, [language, resetEditorContent, setCodeToLoad, handleClearUI]);

  // --- Lifted Effect from CodeEditor ---
  useEffect(() => {
    if (codeToLoad) {
        resetEditorContent(codeToLoad.code);
        setLanguage(codeToLoad.language);
        setCurrentTask(codeToLoad.task);
    }
  }, [codeToLoad, resetEditorContent]);


  const handleLoadNextTask = useCallback(() => {
    if (!completedTask) return;
    
    const currentIndex = flatPythonPath.findIndex(item => item.id === completedTask.id);
    if (currentIndex > -1 && currentIndex < flatPythonPath.length - 1) {
        const nextTask = flatPythonPath[currentIndex + 1];
        setCodeToLoad({ code: nextTask.code || '', language: 'Python', task: nextTask });
        setCompletedTask(null);
        setFeedback('');
        setAnalysisStatus('idle');
        setExecutionStatus('idle');
    } else {
        alert("Congratulations! You've completed the Python Path!");
        setCompletedTask(null);
        setCurrentPage('Python Path');
    }
  }, [completedTask, flatPythonPath, setCodeToLoad, setCurrentPage]);

  const awardPointsForTask = useCallback((task: RoadmapItem) => {
    if (!analytics.completedPythonPathTasks.includes(task.id)) {
      const pointsGained = task.points;
      setPoints(prev => prev + pointsGained);
      
      setAnalytics(prev => {
        const now = Date.now();
        const lastUpdate = prev.lastActivityTimestamp || 0;

        let newWeeklyProgress = [...prev.weeklyProgress];
        if (!isSameWeek(now, lastUpdate)) {
            newWeeklyProgress = newWeeklyProgress.map(day => ({ ...day, points: 0 }));
        }

        const currentDayIndex = new Date().getDay();
        newWeeklyProgress[currentDayIndex] = {
            ...newWeeklyProgress[currentDayIndex],
            points: (newWeeklyProgress[currentDayIndex]?.points || 0) + pointsGained,
        };
        
        return {
          ...prev,
          pythonPathPoints: prev.pythonPathPoints + pointsGained,
          completedPythonPathTasks: [...prev.completedPythonPathTasks, task.id],
          weeklyProgress: newWeeklyProgress,
          lastActivityTimestamp: now,
          recentActivity: [
            {
              id: Date.now(),
              description: `Completed Python Path task: "${task.title}"`,
              points: pointsGained,
              timestamp: new Date().toISOString()
            },
            ...prev.recentActivity
          ].slice(0, 5)
        }
      });
    }
    setCompletedTask(task);
  }, [analytics.completedPythonPathTasks, setPoints, setAnalytics]);

  const awardPointsForActivity = useCallback(async (
    code: string,
    language: Language,
    pointsGained: number,
    activityType: ActivityType
  ) => {
    if (pointsGained <= 0) return;

    const normalizedCode = normalizeCode(code);
    const codeHash = await sha256(normalizedCode);
    if (analytics.analyzedCodeHashes.includes(codeHash)) return;

    setPoints(prev => prev + pointsGained);

    let description = '';
    switch(activityType) {
        case 'analyze': description = `Analyzed ${language} code.`; break;
        case 'enhance': description = `Enhanced ${language} code.`; break;
        case 'execute': description = `Executed ${language} code.`; break;
    }

    setAnalytics(prev => {
        const now = Date.now();
        const lastUpdate = prev.lastActivityTimestamp || 0;

        let newWeeklyProgress = [...prev.weeklyProgress];
        if (!isSameWeek(now, lastUpdate)) {
            newWeeklyProgress = newWeeklyProgress.map(day => ({ ...day, points: 0 }));
        }

        const currentDayIndex = new Date().getDay();
        newWeeklyProgress[currentDayIndex] = {
            ...newWeeklyProgress[currentDayIndex],
            points: (newWeeklyProgress[currentDayIndex]?.points || 0) + pointsGained,
        };

        return {
            ...prev,
            problemsAnalyzed: activityType === 'analyze' ? prev.problemsAnalyzed + 1 : prev.problemsAnalyzed,
            streak: prev.streak + 1,
            skillAreas: { ...prev.skillAreas, [language]: prev.skillAreas[language] + 1 },
            weeklyProgress: newWeeklyProgress,
            lastActivityTimestamp: now,
            recentActivity: [
                { id: Date.now(), description, points: pointsGained, timestamp: new Date().toISOString() },
                ...prev.recentActivity
            ].slice(0, 5),
            analyzedCodeHashes: [...prev.analyzedCodeHashes, codeHash]
        };
    });
  }, [analytics, setPoints, setAnalytics]);

  const handleAnalysis = useCallback(async (code: string, language: Language, difficulty: Difficulty, currentTask: RoadmapItem | null, mode: AnalysisMode) => {
    setAnalysisStatus('loading');
    setFeedback('');
    setAnalysisError('');
    setCompletedTask(null);
    setProgress(0);
    setProgressMessage('Initializing analysis...');
    setAnalysisMode(mode);

    const interval = setInterval(() => {
        setProgress(prev => {
            if (prev >= 99) {
                clearInterval(interval);
                return 99;
            }
            const next = prev + 1;
            if (next < 30) setProgressMessage('Reading your code...');
            else if (next < 60) setProgressMessage('Checking for errors...');
            else if (next < 90) setProgressMessage('Generating suggestions...');
            else setProgressMessage('Finalizing analysis...');
            return next;
        });
    }, 50);

    try {
      const stream = await analyzeCodeStream(code, language, difficulty, currentTask, mode);
      clearInterval(interval);
      setProgress(100);
      setProgressMessage('Analysis complete!');
      setAnalysisStatus('streaming');

      let fullText = '';
      for await (const chunk of stream) {
        const chunkText = chunk.text;
        if (chunkText) {
          fullText += chunkText;
        }
        const trimmedFullText = fullText.trimStart();
        if (trimmedFullText.startsWith(SUCCESS_MARKER)) {
            setFeedback(trimmedFullText.substring(SUCCESS_MARKER.length).trimStart());
        } else {
            setFeedback(fullText);
        }
      }
      
      const finalTrimmedText = fullText.trimStart();
      if (currentTask && finalTrimmedText.startsWith(SUCCESS_MARKER)) {
          awardPointsForTask(currentTask);
      } else if (!currentTask) {
        if (mode === 'analyze') {
          const pointsGained = difficulty === 'Beginner' ? 5 : difficulty === 'Intermediate' ? 10 : 15;
          await awardPointsForActivity(code, language, pointsGained, 'analyze');
        } else if (mode === 'refactor') {
            const pointsGained = difficulty === 'Beginner' ? 3 : difficulty === 'Intermediate' ? 6 : 9;
            await awardPointsForActivity(code, language, pointsGained, 'enhance');
        }
      }

      setAnalysisStatus('complete');
    } catch (err) {
      clearInterval(interval);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setAnalysisError(errorMessage);
      setAnalysisStatus('error');
    }
  }, [awardPointsForTask, awardPointsForActivity]);
  
  const handleExecute = useCallback(async (code: string, language: Language, currentTask: RoadmapItem | null) => {
    setExecutionStatus('running');
    setExecutionOutput('');
    setExecutionError('');
    setCompletedTask(null);

    if (currentTask && language === 'Python') {
        const { output, error, isSuccess } = await getPredictedOutputAndCheckTask(code, language, currentTask);
        if (error) {
            setExecutionError(error);
            setExecutionStatus('error');
        } else {
            setExecutionOutput(output);
            setExecutionStatus('success');
        }
        if (isSuccess) {
            awardPointsForTask(currentTask);
        }
    } else {
        const { output, error } = await executeCode(code, language);
        if (error) {
          setExecutionError(error);
          setExecutionStatus('error');
        } else {
          setExecutionOutput(output);
          setExecutionStatus('success');
          if (!currentTask) {
            const pointsGained = 2;
            await awardPointsForActivity(code, language, pointsGained, 'execute');
          }
        }
    }
  }, [awardPointsForTask, awardPointsForActivity]);

  const onAnalyzeHandler = () => handleAnalysis(code, language, difficulty, currentTask, 'analyze');
  const onRefactorHandler = () => handleAnalysis(code, language, difficulty, currentTask, 'refactor');
  const onExecuteHandler = () => handleExecute(code, language, currentTask);

  const isLoading = analysisStatus === 'loading' || analysisStatus === 'streaming';
  const isExecuting = executionStatus === 'running';

  const leftPanel = (
     <CodeEditor 
        code={code}
        language={language}
        difficulty={difficulty}
        currentTask={currentTask}
        history={history}
        historyIndex={historyIndex}
        setDifficulty={setDifficulty}
        setCodeAndHistory={setCodeAndHistory}
        setCodeFromHistory={setCodeFromHistory}
        resetEditorContent={resetEditorContent}
        handleLanguageChange={handleLanguageChange}
        clearTask={clearTask}
        handleLoadSample={handleLoadSample}
        onAnalyze={onAnalyzeHandler}
        onRefactor={onRefactorHandler}
        onExecute={onExecuteHandler}
        isLoading={isLoading}
        isExecuting={isExecuting}
        onClear={handleClearUI}
    />
  );

  const rightPanel = (
    <div className="flex flex-col gap-6 min-h-0 h-full">
        <div className="h-48 lg:h-56 flex-shrink-0">
            <ExecutionOutput 
                output={executionOutput} 
                error={executionError} 
                status={executionStatus} 
            />
        </div>
        <div className="flex-grow flex flex-col min-h-0">
        {analysisStatus === 'loading' ? (
            <AnalysisLoader progress={progress} message={progressMessage} />
        ) : (
            <AIFeedback 
              feedback={feedback} 
              status={analysisStatus} 
              error={analysisError} 
              completedTask={completedTask}
              onLoadNextTask={handleLoadNextTask}
              mode={analysisMode}
            />
        )}
        </div>
    </div>
  );

  return <ResizablePanels leftPanel={leftPanel} rightPanel={rightPanel} />;
};

export default CodeTutor;
