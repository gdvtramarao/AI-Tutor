import React, { useState, useEffect, useContext, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import type { Language, Difficulty, RoadmapItem, AppContextType } from '../types';
// FIX: Changed SAMPLE_CODE to BEGINNER_SAMPLE_CODE as it's the correct export from constants.
import { LANGUAGES, DIFFICULTIES, BEGINNER_SAMPLE_CODE, PLACEHOLDER_CODE } from '../constants';
import { XIcon } from './icons';

interface CodeEditorProps {
  onAnalyze: (code: string, language: Language, difficulty: Difficulty, currentTask: RoadmapItem | null) => void;
  onExecute: (code: string, language: Language) => void;
  isLoading: boolean;
  isExecuting: boolean;
}

// FIX: Added helper function to select a random snippet since BEGINNER_SAMPLE_CODE is an array of strings.
const selectRandomSnippet = (lang: Language) => {
    const samples = BEGINNER_SAMPLE_CODE[lang];
    return samples[Math.floor(Math.random() * samples.length)];
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onAnalyze, onExecute, isLoading, isExecuting }) => {
  const { codeToLoad, setCodeToLoad } = useContext(AppContext) as AppContextType;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // FIX: Use selectRandomSnippet to initialize with a valid code string.
  const [code, setCode] = useState<string>(selectRandomSnippet('Python'));
  const [language, setLanguage] = useState<Language>('Python');
  const [difficulty, setDifficulty] = useState<Difficulty>('Beginner');
  const [currentTask, setCurrentTask] = useState<RoadmapItem | null>(null);

  useEffect(() => {
    if (codeToLoad) {
      setCode(codeToLoad.code);
      setLanguage(codeToLoad.language);
      setCurrentTask(codeToLoad.task);
    }
  }, [codeToLoad]);
  
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    if (!currentTask) { // Don't change code if it's a task
        // FIX: Use selectRandomSnippet to get a code string.
        setCode(selectRandomSnippet(lang));
    }
  };
  
  const clearTask = () => {
    setCurrentTask(null);
    setCodeToLoad(null);
    setCode(PLACEHOLDER_CODE[language]);
  };

  const handleLoadSample = () => {
    clearTask();
    // FIX: Use selectRandomSnippet to get a code string.
    setCode(selectRandomSnippet(language));
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const { value, selectionStart } = textarea;

      // Find the start of the current line
      const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
      
      // Get the current line's content to find its indentation
      const currentLine = value.substring(lineStart, value.length);
      const match = currentLine.match(/^\s*/);
      const indentation = match ? match[0] : '';
      
      // Construct the new value with the newline and indentation
      const newValue = 
        value.substring(0, selectionStart) + 
        '\n' + 
        indentation + 
        value.substring(selectionStart);
      
      setCode(newValue);
      
      // Schedule the cursor position update to run after the state update
      const newCursorPosition = selectionStart + 1 + indentation.length;
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = newCursorPosition;
          textareaRef.current.selectionEnd = newCursorPosition;
        }
      });
    }
  };

  return (
    <div className="bg-light-panel dark:bg-dark-panel rounded-lg shadow-lg flex flex-col h-full p-2 sm:p-4 border border-light-border dark:border-dark-border gap-2 sm:gap-4">
      {/* Task Banner */}
      {currentTask && (
        <div className="bg-cyan-500/10 p-2 rounded-lg border border-cyan-500/30 flex justify-between items-center">
          <div>
            <p className="text-xs font-semibold text-cyan-400">PYTHON PATH TASK</p>
            <p className="font-semibold text-light-text-primary dark:text-white">{currentTask.title}</p>
          </div>
          <button onClick={clearTask} className="p-1 rounded-full hover:bg-cyan-500/20" aria-label="Clear task">
            <XIcon className="w-5 h-5 text-cyan-400" />
          </button>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="language-select" className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">Language:</label>
          <select
            id="language-select"
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value as Language)}
            className="bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            disabled={!!currentTask}
          >
            {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="difficulty-select" className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">Difficulty:</label>
          <select
            id="difficulty-select"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
            className="bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {DIFFICULTIES.map(diff => <option key={diff} value={diff}>{diff}</option>)}
          </select>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-grow flex flex-col min-h-0">
          <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={PLACEHOLDER_CODE[language]}
              className="flex-grow w-full p-2 sm:p-4 bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary rounded-md font-mono text-xs sm:text-sm border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
              spellCheck="false"
          />
      </div>

      {/* Buttons */}
      <div className="flex flex-row gap-3">
        <button
          onClick={() => onExecute(code, language)}
          disabled={isExecuting || isLoading || !code.trim()}
          className="flex-1 py-2 sm:py-3 px-4 bg-emerald-500 text-white font-semibold rounded-md hover:bg-emerald-400 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isExecuting ? 'Executing...' : 'Execute Code'}
        </button>
        <button
          onClick={() => onAnalyze(code, language, difficulty, currentTask)}
          disabled={isLoading || isExecuting || !code.trim()}
          className="flex-1 py-2 sm:py-3 px-4 bg-cyan-500 text-white font-semibold rounded-md hover:bg-cyan-400 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isLoading ? 'Analyzing...' : (currentTask ? 'Analyze & Submit' : 'Analyze Code')}
        </button>
      </div>
       <button onClick={handleLoadSample} className="text-center text-sm text-cyan-400 hover:underline disabled:text-gray-500 disabled:cursor-not-allowed" disabled={!!currentTask}>
          Load Sample Code
      </button>
    </div>
  );
};

export default CodeEditor;