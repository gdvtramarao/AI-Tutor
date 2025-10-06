import React, { useState, useMemo } from 'react';
import CorrectedCodeModal from './CorrectedCodeModal';

interface AIFeedbackProps {
  feedback: string;
  status: 'idle' | 'loading' | 'streaming' | 'complete' | 'error';
  error: string;
}

const AIFeedback: React.FC<AIFeedbackProps> = ({ feedback, status, error }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { analysisSections, correctedCodeSection } = useMemo(() => {
    if (!feedback || (status !== 'streaming' && status !== 'complete')) {
        return { analysisSections: [], correctedCodeSection: null };
    }
    const allSections = feedback.split('### ').slice(1);
    const correctedCode = allSections.find(s => s.startsWith('✅ Corrected Code'));
    const analysis = allSections.filter(s => !s.startsWith('✅ Corrected Code'));
    
    return { analysisSections: analysis, correctedCodeSection: correctedCode || null };
  }, [feedback, status]);

  const renderSections = (sections: string[]) => {
    return sections.map((section, index) => {
      const parts = section.split('\n');
      const title = parts[0].trim();
      let content = parts.slice(1).join('\n');

      // Special handling for Code Output
      if (title.startsWith('💻 Code Output')) {
          const isErrorOutput = content.includes("cannot be run");
          const outputHtml = content
            .replace(/```([\s\S]*?)```/g, (match, p1) => {
                let code = p1.trim();
                // Remove quotes if they wrap the entire output string
                if ((code.startsWith('"') && code.endsWith('"')) || (code.startsWith("'") && code.endsWith("'"))) {
                    code = code.slice(1, -1);
                }
                return `<pre class="bg-light-bg dark:bg-dark-bg p-4 rounded-md overflow-x-auto my-2 border border-light-border dark:border-dark-border"><code class="text-light-text-primary dark:text-white">${code}</code></pre>`;
            })
            .replace(/\n/g, '<br />');

        return (
          <div key={index}>
            <h3 className="text-xl font-bold mt-4 mb-2 text-cyan-400">{title}</h3>
            <div className={`p-4 rounded-lg border ${isErrorOutput ? 'bg-red-500/10 border-red-500/30' : 'bg-emerald-500/10 border-emerald-500/30'}`}>
                <div dangerouslySetInnerHTML={{ __html: outputHtml }}/>
            </div>
          </div>
        );
      }
      
      // Default handling for other sections
      let htmlContent = content
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code class="bg-light-border dark:bg-dark-hover text-emerald-400 px-1 py-0.5 rounded text-sm">$1</code>')
        .replace(/```([\s\S]*?)```/g, (match, p1) => `<pre class="bg-light-bg dark:bg-dark-bg p-4 rounded-md overflow-x-auto my-4 border border-light-border dark:border-dark-border"><code class="text-light-text-primary dark:text-white">${p1.trim()}</code></pre>`)
        .replace(/\n/g, '<br />');

      return (
        <div key={index}>
          <h3 className="text-xl font-bold mt-4 mb-2 text-cyan-400">{title}</h3>
          <div className="prose prose-invert max-w-none text-light-text-secondary dark:text-dark-text-secondary" dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      );
    });
  };

  const renderContent = () => {
    if (status === 'error') {
      return (
        <div className="text-center text-red-500">
          <h3 className="text-xl font-bold mb-2">Analysis Failed</h3>
          <p>{error}</p>
        </div>
      );
    }

    if (status === 'idle') {
      return (
        <div className="text-center text-light-text-secondary dark:text-dark-text-secondary flex flex-col items-center justify-center h-full">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-light-text-primary dark:text-white">🚀 Welcome to your AI Code Tutor!</h3>
            <p className="mb-4">For the best coding experience, we recommend using a desktop or laptop.</p>
            <ol className="text-left inline-block list-decimal list-inside space-y-2">
              <li>Choose your <strong>language</strong>, paste code, or load a sample.</li>
              <li>Or, begin a guided lesson from the <strong>Python Path</strong>.</li>
              <li>Click <strong>"Analyze Code"</strong> for instant feedback and to earn points!</li>
              <li>Track your progress and stats on the <strong>Dashboard</strong>.</li>
            </ol>
          </div>
        </div>
      );
    }

    return (
      <>
        {renderSections(analysisSections)}
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
    );
  };

  return (
    <div className="bg-light-panel dark:bg-dark-panel rounded-lg shadow-lg flex flex-col h-full p-6 border border-light-border dark:border-dark-border">
       <div className="overflow-y-auto flex-grow">
        {renderContent()}
      </div>
      {isModalOpen && correctedCodeSection && (
        <CorrectedCodeModal 
            code={correctedCodeSection}
            onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AIFeedback;