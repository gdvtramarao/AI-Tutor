import React, { useState, useMemo } from 'react';
import type { RoadmapItem, Language, Difficulty } from '../types';
import AnalysisLoader from './AnalysisLoader';
import CorrectedCodeModal from './CorrectedCodeModal';
import { XIcon } from './icons';

type AnalysisStatus = 'idle' | 'loading' | 'streaming' | 'complete' | 'error';

interface PythonPathTutorProps {
  task: RoadmapItem;
  initialCode: string;
  onAnalyze: (code: string, language: Language, difficulty: Difficulty, task: RoadmapItem | null, testCases: string) => void;
  onExit: () => void;
  status: AnalysisStatus;
  feedback: string;
  error: string;
  progress: number;
  progressMessage: string;
}

const SectionRenderer: React.FC<{ sections: string[] }> = ({ sections }) => {
  return (
    <>
      {sections.map((section, index) => {
        const parts = section.split('\n');
        const title = parts[0].trim();
        let content = parts.slice(1).join('\n');

        let htmlContent = content
          .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
          .replace(/`([^`]+)`/g, '<code class="bg-light-border dark:bg-dark-hover text-emerald-400 px-1 py-0.5 rounded text-sm">$1</code>')
          .replace(/```([\s\S]*?)```/g, (match, p1) => `<pre class="bg-light-bg dark:bg-dark-bg p-4 rounded-md overflow-x-auto my-4 border border-light-border dark:border-dark-border"><code class="text-light-text-primary dark:text-white">${p1.trim()}</code></pre>`)
          .replace(/\n/g, '<br />');

        return (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-bold mt-4 mb-2 text-cyan-400">{title}</h3>
            <div className="prose prose-invert max-w-none text-light-text-secondary dark:text-dark-text-secondary" dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </div>
        );
      })}
    </>
  );
};


const PythonPathTutor: React.FC<PythonPathTutorProps> = ({
  task,
  initialCode,
  onAnalyze,
  onExit,
  status,
  feedback,
  error,
  progress,
  progressMessage
}) => {
  const [code, setCode] = useState(initialCode);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoading = status === 'loading' || status === 'streaming';

  const { outputSection, analysisSections, correctedCodeSection } = useMemo(() => {
    if (!feedback || (status !== 'streaming' && status !== 'complete')) {
      return { outputSection: null, analysisSections: [], correctedCodeSection: null };
    }
    const allSections = feedback.split('### ').slice(1);
    const output = allSections.find(s => s.startsWith('💻 Code Output'));
    const correctedCode = allSections.find(s => s.startsWith('✅ Corrected Code'));
    const analysis = allSections.filter(s => !s.startsWith('💻 Code Output') && !s.startsWith('✅ Corrected Code'));

    return { outputSection: output || null, analysisSections: analysis, correctedCodeSection: correctedCode || null };
  }, [feedback, status]);

  const handleAnalyzeClick = () => {
    // Difficulty is hardcoded for Python Path, but could be dynamic in the future
    onAnalyze(code, 'Python', 'Beginner', task, '');
  };

  const renderOutputContent = () => {
    if (isLoading) return <p>Waiting for analysis...</p>;
    if (!outputSection) return <p>Run the analysis to see the code's output.</p>;

    const parts = outputSection.split('\n');
    const content = parts.slice(1).join('\n');

    const htmlContent = content
      .replace(/```([\s\S]*?)```/g, (match, p1) => `<pre class="bg-light-bg dark:bg-dark-bg p-4 rounded-md overflow-x-auto my-2 border border-light-border dark:border-dark-border"><code class="text-light-text-primary dark:text-white">${p1.trim()}</code></pre>`)
      .replace(/\n/g, '<br />');

    const isErrorOutput = content.includes("cannot be run");

    return (
        <div className={`p-4 rounded-lg border h-full ${isErrorOutput ? 'bg-red-500/10 border-red-500/30' : 'bg-emerald-500/10 border-emerald-500/30'}`}>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }}/>
        </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row flex-grow h-full gap-6 min-h-0">
       {isModalOpen && correctedCodeSection && (
        <CorrectedCodeModal 
            code={correctedCodeSection}
            onClose={() => setIsModalOpen(false)}
        />
      )}
      {/* Left Column */}
      <div className="lg:w-1/2 flex flex-col gap-4 min-h-0">
        <div className="bg-light-panel dark:bg-dark-panel p-4 rounded-lg border border-light-border dark:border-dark-border flex-shrink-0 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-light-text-primary dark:text-white">{task.title}</h2>
            <p className="text-sm text-cyan-400">Python Path Task</p>
          </div>
          <button onClick={onExit} className="p-2 rounded-full hover:bg-light-border dark:hover:bg-dark-hover" aria-label="Exit task view">
              <XIcon className="w-6 h-6 text-light-text-secondary dark:text-dark-text-secondary" />
          </button>
        </div>
        <div className="bg-light-panel dark:bg-dark-panel rounded-lg flex flex-col flex-grow p-4 border border-light-border dark:border-dark-border min-h-0">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-grow w-full p-4 bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary rounded-md font-mono text-sm border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
          />
          <button
            onClick={handleAnalyzeClick}
            disabled={isLoading || !code.trim()}
            className="mt-4 w-full py-3 px-4 bg-cyan-500 text-white font-semibold rounded-md hover:bg-cyan-400 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isLoading ? 'Analyzing...' : 'Analyze & Submit'}
          </button>
        </div>
      </div>

      {/* Right Column */}
      <div className="lg:w-1/2 flex flex-col gap-6 min-h-0">
        <div className="bg-light-panel dark:bg-dark-panel p-4 rounded-lg border border-light-border dark:border-dark-border flex-shrink-0">
             <h3 className="text-lg font-bold text-light-text-primary dark:text-white mb-2">💻 Code Output</h3>
             <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                {renderOutputContent()}
             </div>
        </div>
        <div className="bg-light-panel dark:bg-dark-panel p-4 rounded-lg border border-light-border dark:border-dark-border flex-grow flex flex-col min-h-0">
            <h3 className="text-lg font-bold text-light-text-primary dark:text-white mb-2 flex-shrink-0">🤖 AI Feedback</h3>
            <div className="overflow-y-auto flex-grow">
                {status === 'loading' && <AnalysisLoader progress={progress} message={progressMessage} />}
                {status !== 'loading' && status !== 'idle' && (
                    <>
                        <SectionRenderer sections={analysisSections} />
                         {correctedCodeSection && (
                            <div className="mt-6 text-center">
                                <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-6 py-3 bg-cyan-500 text-white font-semibold rounded-md hover:bg-cyan-400 transition-all duration-200"
                                >
                                💡 Show Improvised Code
                                </button>
                            </div>
                        )}
                    </>
                )}
                {status === 'idle' && <p className="text-light-text-secondary dark:text-dark-text-secondary text-center p-8">Click "Analyze & Submit" to get feedback on your solution.</p>}
                {status === 'error' && <p className="text-red-500">{error}</p>}
            </div>
        </div>
      </div>
    </div>
  );
};

export default PythonPathTutor;
