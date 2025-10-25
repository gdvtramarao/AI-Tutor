import React, { useState, useMemo } from 'react';
import CorrectedCodeModal from './CorrectedCodeModal';
import { ChevronRightIcon, ChatBubbleIcon } from './icons';
import type { RoadmapItem } from '../types';

type AnalysisMode = 'analyze' | 'refactor';

interface AIFeedbackProps {
  feedback: string;
  status: 'idle' | 'loading' | 'streaming' | 'complete' | 'error';
  error: string;
  completedTask: RoadmapItem | null;
  onLoadNextTask: () => void;
  mode: AnalysisMode;
}

const CollapsibleFeedbackSection: React.FC<{ section: string; defaultOpen?: boolean }> = ({ section, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const parts = section.split('\n');
    const title = parts[0].trim();
    const content = parts.slice(1).join('\n');

    const isCodeOutput = title.startsWith('💻 Code Output');
    const isErrorOutput = content.includes("cannot be run");

    const outputHtml = content
        .replace(/```([\s\S]*?)```/g, (match, p1) => {
            let code = p1.trim();
            if ((code.startsWith('"') && code.endsWith('"')) || (code.startsWith("'") && code.endsWith("'"))) {
                code = code.slice(1, -1);
            }
            return `<pre class="bg-light-bg dark:bg-dark-bg p-4 rounded-md overflow-x-auto my-2 border border-light-border dark:border-dark-border"><code class="text-light-text-primary dark:text-white">${code}</code></pre>`;
        })
        .replace(/\n/g, '<br />');

    const defaultHtmlContent = content
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code class="bg-light-border dark:bg-dark-hover text-emerald-400 px-1 py-0.5 rounded text-sm">$1</code>')
        .replace(/```([\s\S]*?)```/g, (match, p1) => `<pre class="bg-light-bg dark:bg-dark-bg p-4 rounded-md overflow-x-auto my-4 border border-light-border dark:border-dark-border"><code class="text-light-text-primary dark:text-white">${p1.trim()}</code></pre>`)
        .replace(/\n/g, '<br />');

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-2 text-left"
                aria-expanded={isOpen}
            >
                <h3 className="text-lg sm:text-xl font-bold text-cyan-400">{title}</h3>
                <ChevronRightIcon className={`w-6 h-6 text-cyan-400 transform transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
            </button>
            {isOpen && (
                <div className="pb-4 pr-2">
                    {isCodeOutput ? (
                        <div className={`p-4 rounded-lg border ${isErrorOutput ? 'bg-red-500/10 border-red-500/30' : 'bg-emerald-500/10 border-emerald-500/30'}`}>
                            <div dangerouslySetInnerHTML={{ __html: outputHtml }}/>
                        </div>
                    ) : (
                        <div className="prose prose-invert max-w-none text-light-text-secondary dark:text-dark-text-secondary" dangerouslySetInnerHTML={{ __html: defaultHtmlContent }} />
                    )}
                </div>
            )}
        </div>
    );
};

const AIFeedback: React.FC<AIFeedbackProps> = ({ feedback, status, error, completedTask, onLoadNextTask, mode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { analysisSections, codeBlockSection } = useMemo(() => {
    if (!feedback || (status !== 'streaming' && status !== 'complete')) {
        return { analysisSections: [], codeBlockSection: null };
    }
    const allSections = feedback.split('### ').slice(1);
    const codeSection = allSections.find(s => s.startsWith('✅ Corrected Code') || s.startsWith('✅ Enhanced Code'));
    const analysis = allSections.filter(s => !s.startsWith('✅ Corrected Code') && !s.startsWith('✅ Enhanced Code'));
    
    return { analysisSections: analysis, codeBlockSection: codeSection || null };
  }, [feedback, status]);

  const renderContent = () => {
    if (status === 'error') {
      return (
        <div className="text-center text-red-500">
          <h3 className="text-xl font-bold mb-2">Analysis Failed</h3>
          <p>{error}</p>
        </div>
      );
    }

    if (status === 'idle' && !completedTask) {
      return (
        <div className="text-center text-light-text-secondary dark:text-dark-text-secondary flex flex-col items-center justify-center h-full p-2">
          <div>
            <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 text-light-text-primary dark:text-white">🚀 Welcome to your AI Code Tutor!</h3>
            <p className="mb-4 text-sm sm:text-base">For the best coding experience, we recommend using a desktop or laptop.</p>
            <ol className="text-left inline-block list-decimal list-inside space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li>Choose your <strong>language</strong>, paste code, or load a sample.</li>
              <li>Or, begin a guided lesson from the <strong>Python Path</strong>.</li>
              <li>Click <strong>"Analyze Code"</strong> for instant feedback and to earn points!</li>
              <li>Track your progress and stats on the <strong>Dashboard</strong>.</li>
            </ol>
            <div className="mt-6 pt-4 border-t border-light-border dark:border-dark-border/50 flex items-center justify-center gap-2 text-sm">
                <ChatBubbleIcon className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <p>Have questions about features? Ask our <strong className="text-light-text-primary dark:text-dark-text-primary">AI Assistant</strong>!</p>
            </div>
          </div>
        </div>
      );
    }

    const buttonText = mode === 'refactor' ? 'Show Enhanced Code' : '💡 Show Improvised Code';
    const buttonClass = mode === 'refactor' 
        ? 'bg-violet-500 hover:bg-violet-400' 
        : 'bg-cyan-500 hover:bg-cyan-400';

    return (
      <div className="divide-y divide-light-border dark:divide-dark-border">
        {analysisSections.map((section, index) => (
            <CollapsibleFeedbackSection key={index} section={section} defaultOpen={index === 0 || analysisSections.length === 1} />
        ))}
        {codeBlockSection && (
          <div className="pt-6 text-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className={`px-6 py-3 text-white font-semibold rounded-md transition-all duration-200 ${buttonClass}`}
            >
              {buttonText}
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-light-panel dark:bg-dark-panel rounded-lg shadow-lg flex flex-col h-full p-2 sm:p-6 border border-light-border dark:border-dark-border">
       {completedTask && (
        <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/30 mb-4 text-center flex-shrink-0">
            <h3 className="text-lg font-bold text-emerald-400">🎉 Task Complete!</h3>
            <p className="text-dark-text-secondary mt-1">Great job on solving "{completedTask.title}".</p>
            <button 
                onClick={onLoadNextTask}
                className="mt-3 px-4 py-2 bg-cyan-500 text-white font-semibold rounded-md hover:bg-cyan-400 transition-colors"
            >
                Continue to Next Task
            </button>
        </div>
       )}
       <div className="overflow-y-auto flex-grow">
        {renderContent()}
      </div>
      {isModalOpen && codeBlockSection && (
        <CorrectedCodeModal 
            codeSection={codeBlockSection}
            onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AIFeedback;