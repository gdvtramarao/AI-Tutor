import React, { useContext, useRef, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import type { Language, Difficulty, RoadmapItem, AppContextType } from '../types';
import { LANGUAGES, DIFFICULTIES, PLACEHOLDER_CODE } from '../constants';
import { XIcon } from './icons';
import SyntaxHighlighter from './SyntaxHighlighter';

interface CodeEditorProps {
  code: string;
  language: Language;
  difficulty: Difficulty;
  currentTask: RoadmapItem | null;
  history: string[];
  historyIndex: number;
  
  setDifficulty: React.Dispatch<React.SetStateAction<Difficulty>>;
  setCodeAndHistory: (newCode: string) => void;
  setCodeFromHistory: (newIndex: number) => void;
  resetEditorContent: (newCode: string) => void;
  handleLanguageChange: (lang: Language) => void;
  clearTask: () => void;
  handleLoadSample: () => void;

  onAnalyze: () => void;
  onRefactor: () => void;
  onExecute: () => void;
  isLoading: boolean;
  isExecuting: boolean;
  onClear: () => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
    code, language, difficulty, currentTask, history, historyIndex,
    setDifficulty, setCodeAndHistory, setCodeFromHistory, resetEditorContent, 
    handleLanguageChange, clearTask, handleLoadSample,
    onAnalyze, onRefactor, onExecute, isLoading, isExecuting, onClear 
}) => {
  const { theme } = useContext(AppContext) as AppContextType;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLDivElement>(null);
  const lineNumbersRef = useRef<HTMLTextAreaElement>(null);

  const lineCount = useMemo(() => code.split('\n').length, [code]);
  const lineNumbersText = useMemo(() => {
    return Array.from({ length: lineCount }, (_, i) => i + 1).join('\n');
  }, [lineCount]);
  
  const handleClear = () => {
    if (currentTask) {
        clearTask();
    } else {
        resetEditorContent(PLACEHOLDER_CODE[language]);
    }
    onClear();
  };

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const scrollLeft = e.currentTarget.scrollLeft;
    
    if (preRef.current) {
        preRef.current.scrollTop = scrollTop;
        preRef.current.scrollLeft = scrollLeft;
    }
    if (lineNumbersRef.current) {
        lineNumbersRef.current.scrollTop = scrollTop;
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle Undo (Ctrl+Z) and Redo (Ctrl+Y)
    if (e.ctrlKey) {
        switch (e.key.toLowerCase()) {
            case 'z':
                e.preventDefault();
                setCodeFromHistory(historyIndex - 1);
                return;
            case 'y':
                e.preventDefault();
                setCodeFromHistory(historyIndex + 1);
                return;
            // Native browser behavior for Ctrl+A (Select All) and Ctrl+C (Copy) is allowed to proceed.
        }
    }
    
    // Handle Tab key for indentation
    if (e.key === 'Tab') {
        e.preventDefault();
        const textarea = e.currentTarget;
        const { value, selectionStart, selectionEnd } = textarea;
        // Insert two spaces for indentation
        const newValue = value.substring(0, selectionStart) + '  ' + value.substring(selectionEnd);
        setCodeAndHistory(newValue);

        // Move cursor after the inserted spaces
        requestAnimationFrame(() => {
            if (textareaRef.current) {
                textareaRef.current.selectionStart = textareaRef.current.selectionEnd = selectionStart + 2;
            }
        });
    } 
    // Handle Enter key for intelligent auto-indentation
    else if (e.key === 'Enter') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const { value, selectionStart, selectionEnd } = textarea;

      // Find indentation of the current line
      const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
      const currentLine = value.substring(lineStart, selectionStart);
      const match = currentLine.match(/^\s*/);
      const currentIndentation = match ? match[0] : '';
      const trimmedLine = currentLine.trim();
      
      let newIndentation = currentIndentation;
      
      const shouldIndent = 
        (language === 'Python' && trimmedLine.endsWith(':')) ||
        (LANGUAGES.filter(l => l !== 'Python').includes(language) && trimmedLine.endsWith('{'));
      
      // Case 1: Increase indentation for new blocks
      if (shouldIndent) {
        newIndentation = currentIndentation + '  ';
        const nextChar = value.substring(selectionEnd, selectionEnd + 1);

        // Special case for JS/Java etc: cursor is between {}
        if (nextChar === '}') {
          const textToInsert = '\n' + newIndentation + '\n' + currentIndentation;
          const newValue = value.substring(0, selectionStart) + textToInsert + value.substring(selectionEnd);
          setCodeAndHistory(newValue);
          
          const newCursorPosition = selectionStart + 1 + newIndentation.length;
          requestAnimationFrame(() => {
            if (textareaRef.current) {
              textareaRef.current.selectionStart = newCursorPosition;
              textareaRef.current.selectionEnd = newCursorPosition;
            }
          });
          return; // Early return for this special case
        }
      } 
      // Case 2: Decrease indentation on an empty line within a block
      else if (trimmedLine === '' && currentIndentation.length > 0) {
          newIndentation = currentIndentation.slice(0, -2);
      }

      // Default case: Apply calculated indentation
      const textToInsert = '\n' + newIndentation;
      const newValue = value.substring(0, selectionStart) + textToInsert + value.substring(selectionEnd);
      setCodeAndHistory(newValue);
      
      const newCursorPosition = selectionStart + textToInsert.length;
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
          {!currentTask && (
            <button 
                onClick={handleLoadSample}
                className="px-3 py-1 text-sm bg-light-border dark:bg-dark-hover text-light-text-secondary dark:text-dark-text-secondary rounded-md hover:bg-gray-300 dark:hover:bg-dark-border transition-colors"
                aria-label="Load sample code"
            >
                Sample
            </button>
           )}
          <button 
            onClick={handleClear}
            className="px-3 py-1 text-sm bg-light-border dark:bg-dark-hover text-light-text-secondary dark:text-dark-text-secondary rounded-md hover:bg-gray-300 dark:hover:bg-dark-border transition-colors"
            aria-label={currentTask ? 'Exit Task & Clear Code' : 'Clear Code'}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-grow flex flex-row min-h-0 rounded-md border border-light-border dark:border-dark-border overflow-hidden">
        {/* Line Numbers */}
        <textarea
            ref={lineNumbersRef}
            readOnly
            value={lineNumbersText}
            className="w-12 text-right px-2 py-2 sm:py-4 bg-light-bg dark:bg-dark-bg text-light-text-secondary dark:text-dark-text-secondary font-mono text-xs sm:text-sm resize-none whitespace-pre select-none border-r border-light-border dark:border-dark-border focus:outline-none line-numbers-scrollbar-hide"
            aria-hidden="true"
        />
        {/* Editor Content (Layered) */}
        <div className="relative flex-grow h-full bg-light-bg dark:bg-dark-bg">
            <div
                ref={preRef}
                className="absolute inset-0 w-full h-full p-2 sm:p-4 font-mono text-xs sm:text-sm overflow-auto pointer-events-none line-numbers-scrollbar-hide"
            >
                <SyntaxHighlighter code={code} language={language} />
            </div>
            <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCodeAndHistory(e.target.value)}
                onKeyDown={handleKeyDown}
                onScroll={handleScroll}
                placeholder={PLACEHOLDER_CODE[language]}
                className={`absolute inset-0 w-full h-full p-2 sm:p-4 bg-transparent text-transparent rounded-r-md font-mono text-xs sm:text-sm border-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-400 resize-none overflow-auto ${theme === 'dark' ? 'caret-white' : 'caret-black'}`}
                spellCheck="false"
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
            />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onExecute}
          disabled={isExecuting || isLoading || !code.trim()}
          className="w-full sm:flex-1 order-1 py-3 px-4 bg-emerald-500 text-white font-semibold rounded-md hover:bg-emerald-400 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isExecuting ? 'Executing...' : 'Execute Code'}
        </button>
        <button
          onClick={onRefactor}
          disabled={isLoading || isExecuting || !code.trim()}
          className="w-full sm:flex-1 order-2 py-2 px-4 bg-violet-500 text-white font-semibold rounded-md hover:bg-violet-400 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isLoading ? 'Analyzing...' : 'Enhance My Code'}
        </button>
        <button
          onClick={onAnalyze}
          disabled={isLoading || isExecuting || !code.trim()}
          className="w-full sm:flex-1 order-3 py-2 px-4 bg-cyan-500 text-white font-semibold rounded-md hover:bg-cyan-400 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isLoading ? 'Analyzing...' : (currentTask ? 'Analyze & Submit' : 'Analyze Code')}
        </button>
      </div>
      {currentTask && (
        <p className="text-center text-xs sm:text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1 px-2">
            Click <strong className="font-semibold text-cyan-400">'Analyze &amp; Submit'</strong> to check your solution. If your solution is correct, you will receive a <strong className="font-semibold text-emerald-400">🎉 Task Complete!</strong> message and a continue button. Click <strong className="font-semibold text-dark-text-primary">'Clear'</strong> to exit the Python Path and return to the normal code editor. If you have any queries, ask the <strong className="font-semibold text-cyan-400">AI assistant</strong>.
        </p>
      )}
    </div>
  );
};

export default CodeEditor;