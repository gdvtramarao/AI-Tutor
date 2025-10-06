import React, { useState, useContext, useEffect } from 'react';
import { LANGUAGES, DIFFICULTIES, SAMPLE_CODE } from '../constants';
import type { Language, Difficulty, AppContextType, RoadmapItem } from '../types';
import { AppContext } from '../context/AppContext';

interface CodeEditorProps {
  onAnalyze: (code: string, language: Language, difficulty: Difficulty, task: RoadmapItem | null) => void;
  isLoading: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onAnalyze, isLoading }) => {
  const [code, setCode] = useState<string>(SAMPLE_CODE['Python']);
  const [language, setLanguage] = useState<Language>('Python');
  const [difficulty, setDifficulty] = useState<Difficulty>('Beginner');
  const [currentTask, setCurrentTask] = useState<RoadmapItem | null>(null);
  const { codeToLoad, setCodeToLoad } = useContext(AppContext) as AppContextType;

  useEffect(() => {
    if (codeToLoad) {
      setCode(codeToLoad.code);
      setLanguage(codeToLoad.language);
      setCurrentTask(codeToLoad.task);
      // Optional: scroll to top or focus editor
      setCodeToLoad(null); // Reset after loading
    }
  }, [codeToLoad, setCodeToLoad]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as Language;
    setLanguage(newLang);
    setCode(SAMPLE_CODE[newLang]);
    setCurrentTask(null); // Clear task when language changes
  };
  
  const handleLoadSample = () => {
    setCode(SAMPLE_CODE[language]);
    setCurrentTask(null); // Clear task when loading a generic sample
  }

  const handleAnalyzeClick = () => {
    if (code.trim()) {
      onAnalyze(code, language, difficulty, currentTask);
    }
  };

  return (
    <div className="bg-light-panel dark:bg-dark-panel rounded-lg shadow-lg flex flex-col h-full p-4 border border-light-border dark:border-dark-border">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-4">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="bg-light-bg dark:bg-dark-hover text-light-text-primary dark:text-white rounded-md px-3 py-2 text-sm border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
            className="bg-light-bg dark:bg-dark-hover text-light-text-primary dark:text-white rounded-md px-3 py-2 text-sm border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {DIFFICULTIES.map((diff) => (
              <option key={diff} value={diff}>{diff}</option>
            ))}
          </select>
        </div>
        <button 
          onClick={handleLoadSample}
          className="px-4 py-2 text-sm font-medium text-light-text-secondary dark:text-dark-text-primary bg-light-border dark:bg-dark-hover rounded-md hover:bg-gray-200 dark:hover:bg-dark-border transition-colors duration-200"
        >
          Load Sample
        </button>
      </div>
       {currentTask && (
        <div className="mb-2 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-sm text-cyan-700 dark:text-cyan-300">
          <strong>Python Path Task:</strong> {currentTask.title}
        </div>
      )}
      <div className="flex flex-col flex-grow min-h-0">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here..."
          className="flex-grow w-full p-4 bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary rounded-md font-mono text-sm border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
        />
      </div>
      <button
        onClick={handleAnalyzeClick}
        disabled={isLoading || !code.trim()}
        className="mt-4 w-full py-3 px-4 bg-cyan-500 text-white font-semibold rounded-md hover:bg-cyan-400 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200"
      >
        {isLoading ? 'Analyzing...' : 'Analyze Code'}
      </button>
    </div>
  );
};

export default CodeEditor;