import React, { useState, useContext, useCallback } from 'react';
import CodeEditor from '../components/CodeEditor';
import AIFeedback from '../components/AIFeedback';
import AnalysisLoader from '../components/AnalysisLoader';
import { analyzeCodeStream } from '../services/geminiService';
import type { Language, Difficulty, RoadmapItem } from '../types';
import { AppContext } from '../context/AppContext';
import type { AppContextType } from '../types';

type AnalysisStatus = 'idle' | 'loading' | 'streaming' | 'complete' | 'error';

const SUCCESS_MARKER = '[TASK_SUCCESS]';

const CodeTutor: React.FC = () => {
  const [status, setStatus] = useState<AnalysisStatus>('idle');
  const [feedback, setFeedback] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');
  const { setPoints, setAnalytics, analytics } = useContext(AppContext) as AppContextType;

  const handleAnalysis = useCallback(async (code: string, language: Language, difficulty: Difficulty, task: RoadmapItem | null) => {
    setStatus('loading');
    setFeedback('');
    setError('');
    setProgress(0);
    setProgressMessage('Initializing analysis...');

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
      const stream = await analyzeCodeStream(code, language, difficulty, task);
      clearInterval(interval);
      setProgress(100);
      setProgressMessage('Analysis complete!');
      setStatus('streaming');

      let fullText = '';
      for await (const chunk of stream) {
        const chunkText = chunk.text;
        fullText += chunkText;
        setFeedback(fullText.startsWith(SUCCESS_MARKER) ? fullText.substring(SUCCESS_MARKER.length).trim() : fullText);
      }
      
      if (task && fullText.startsWith(SUCCESS_MARKER)) {
        if (!analytics.completedPythonPathTasks.includes(task.id)) {
          const pointsGained = task.points;
          setPoints(prev => prev + pointsGained);
          setAnalytics(prev => ({
            ...prev,
            pythonPathPoints: prev.pythonPathPoints + pointsGained,
            completedPythonPathTasks: [...prev.completedPythonPathTasks, task.id],
            recentActivity: [
              {
                id: Date.now(),
                description: `Completed Python Path task: "${task.title}"`,
                points: pointsGained,
                timestamp: new Date().toISOString()
              },
              ...prev.recentActivity
            ].slice(0, 5)
          }));
        }
      } else {
         const pointsGained = difficulty === 'Beginner' ? 5 : difficulty === 'Intermediate' ? 10 : 15;
         setPoints(prev => prev + pointsGained);
         setAnalytics(prev => ({
            ...prev,
            errorsFixed: prev.errorsFixed + 1,
            streak: prev.streak + 1,
            successRate: Math.min(100, prev.successRate + 2),
            skillAreas: { ...prev.skillAreas, [language]: prev.skillAreas[language] + 1 },
            recentActivity: [
              { id: Date.now(), description: `Analyzed ${language} code.`, points: pointsGained, timestamp: new Date().toISOString() },
              ...prev.recentActivity
            ].slice(0, 5)
         }));
      }

      setStatus('complete');
    } catch (err) {
      clearInterval(interval);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      setStatus('error');
    }
  }, [setPoints, setAnalytics, analytics.completedPythonPathTasks]);

  return (
    <div className="flex flex-col lg:flex-row flex-grow h-full gap-6 min-h-0">
      <div className="lg:w-2/5 flex flex-col flex-grow min-h-0">
        <CodeEditor onAnalyze={handleAnalysis} isLoading={status === 'loading' || status === 'streaming'} />
      </div>
      <div className="lg:w-3/5 flex-grow flex flex-col min-h-0">
        {status === 'loading' ? (
          <AnalysisLoader progress={progress} message={progressMessage} />
        ) : (
          <AIFeedback feedback={feedback} status={status} error={error} />
        )}
      </div>
    </div>
  );
};

export default CodeTutor;