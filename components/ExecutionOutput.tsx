import React from 'react';
import { PlayIcon } from './icons';

type ExecutionStatus = 'idle' | 'running' | 'success' | 'error';

interface ExecutionOutputProps {
  output: string;
  error: string;
  status: ExecutionStatus;
}

const ExecutionOutput: React.FC<ExecutionOutputProps> = ({ output, error, status }) => {
  const renderContent = () => {
    switch (status) {
      case 'running':
        return <p className="text-light-text-secondary dark:text-dark-text-secondary animate-pulse">Executing code...</p>;
      case 'success':
        return <pre className="whitespace-pre-wrap text-light-text-primary dark:text-dark-text-primary">{output}</pre>;
      case 'error':
        return <pre className="text-red-500 whitespace-pre-wrap">{error}</pre>;
      case 'idle':
      default:
        return (
          <div className="text-center text-light-text-secondary dark:text-dark-text-secondary flex flex-col items-center justify-center h-full">
            <PlayIcon className="w-8 h-8 mb-2" />
            <p>Click "Execute Code" to run your code and see the output here.</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-light-panel dark:bg-dark-panel rounded-lg shadow-lg p-4 border border-light-border dark:border-dark-border flex flex-col h-full">
      <h3 className="text-lg font-bold text-light-text-primary dark:text-white mb-2 flex-shrink-0">Execution Output</h3>
      <div className="overflow-y-auto flex-grow bg-light-bg dark:bg-dark-bg p-3 rounded-md font-mono text-sm">
        {renderContent()}
      </div>
    </div>
  );
};

export default ExecutionOutput;