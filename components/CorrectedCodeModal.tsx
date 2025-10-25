import React, { useState, useMemo } from 'react';
import { XIcon } from './icons';

interface CorrectedCodeModalProps {
  codeSection: string;
  onClose: () => void;
}

const CorrectedCodeModal: React.FC<CorrectedCodeModalProps> = ({ codeSection, onClose }) => {
  const [isCopied, setIsCopied] = useState(false);

  const { title, codeContent } = useMemo(() => {
    const titleMatch = codeSection.match(/✅ (Corrected|Enhanced) Code/);
    const extractedTitle = titleMatch ? `✅ ${titleMatch[1]} Code` : '✅ Improvised Code';

    const codeBlockMatch = codeSection.match(/```(?:[a-zA-Z]*)?\n([\s\S]*?)```/);
    const extractedCode = codeBlockMatch ? codeBlockMatch[1].trim() : 'Could not display code.';
    
    return { title: extractedTitle, codeContent: extractedCode };
  }, [codeSection]);

  const handleCopy = () => {
    if (codeContent) {
        navigator.clipboard.writeText(codeContent);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    }
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-light-panel dark:bg-dark-panel rounded-lg shadow-2xl p-6 border border-light-border dark:border-dark-border w-11/12 md:w-2/3 lg:w-1/2 max-w-4xl flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
          <h3 className="text-xl font-bold text-light-text-primary dark:text-white">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-light-border dark:hover:bg-dark-hover" aria-label="Close modal">
            <XIcon className="w-6 h-6 text-light-text-secondary dark:text-dark-text-secondary" />
          </button>
        </div>
        <div className="overflow-auto min-h-0 relative">
            <button 
                onClick={handleCopy}
                className="absolute top-2 right-2 px-3 py-1 text-xs bg-light-border dark:bg-dark-hover text-light-text-secondary dark:text-dark-text-primary rounded-md hover:bg-gray-300 dark:hover:bg-dark-border transition-colors z-10"
            >
                {isCopied ? 'Copied!' : 'Copy'}
            </button>
            <pre className="bg-light-bg dark:bg-dark-bg p-4 rounded-md overflow-x-auto border border-light-border dark:border-dark-border">
                <code className="text-light-text-primary dark:text-dark-text-primary">{codeContent}</code>
            </pre>
        </div>
      </div>
    </div>
  );
};

export default CorrectedCodeModal;