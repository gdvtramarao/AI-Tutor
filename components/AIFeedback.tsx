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

      if (title === '💻 Code Output') {
        const isErrorOutput = content.includes("cannot be run");
        const outputHtml = content
          .replace(/```([\s\S]*?)```/g, (match, p1) => `<pre class="bg-light-bg dark:bg-dark-bg p-4 rounded-md overflow-x-auto my-2 border border-light-border dark:border-dark-border"><code class="text-light-text-primary dark:text-white">${p1.trim()}</code></pre>`)
          .replace(/\n/g, '<br />');

        return (
          <div key={index}>
            <h3 className="text-xl font-bold mt-4 mb-2 text-cyan-400">🧐 {title}</h3>
            <div className={`p-4 rounded-lg border ${isErrorOutput ? 'bg-red-500/10 border-red-500/30' : 'bg-emerald-500/10 border-emerald-500/30'}`}>
                <div dangerouslySetInnerHTML={{ __html: outputHtml }}/>
            </div>
          </div>
        );
      }
      
      const htmlContent = content
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code class="bg-light-border dark:bg-dark-hover text-emerald-400 px-1 py-0.5 rounded text-sm">$1</code>')
        .replace(/```([\s\S]*?)```/g, (match, p1) => `<pre class="bg-light-bg dark:bg-dark-bg p-4 rounded-md overflow-x-auto my-4 border border-light-border dark:border-dark-border"><code class="text-light-text-primary dark:text-white">${p1.trim()}</code></pre>`)
        .replace(/\n/g, '<br />');

      return (
        <div key={index}>
          <h3 className="text-xl font-bold mt-4 mb-2 text-cyan-400">🧐 {title}</h3>
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
        <div className="text-center text-light-text-secondary dark:text-dark-text-secondary">
          <h3 className="text-2xl font-bold mb-4 text-light-text-primary dark:text-white">Welcome to the AI Code Tutor!</h3>
          <p className="mb-2">1. Select your programming language and skill level.</p>
          <p className="mb-2">2. Paste your code into the editor or load a sample.</p>
          <p className="mb-4">3. Click "Analyze Code" to get instant, expert feedback.</p>
          <p>Let's improve your coding skills together!</p>
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