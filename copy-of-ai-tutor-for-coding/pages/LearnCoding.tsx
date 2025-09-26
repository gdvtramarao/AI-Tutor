import React, { useState, useMemo } from 'react';
import { PROBLEM_LIBRARY, LANGUAGES } from '../constants';
import type { Snippet, Language } from '../types';

const SnippetCard: React.FC<{ snippet: Snippet }> = ({ snippet }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(snippet.code);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="bg-light-panel dark:bg-dark-panel rounded-lg overflow-hidden border border-light-border dark:border-dark-border flex flex-col">
            <div className="p-4">
                <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">{snippet.title}</h3>
                <span className={`text-xs font-medium px-2 py-1 rounded-full mt-1 inline-block ${
                    snippet.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-700 dark:text-green-300' :
                    snippet.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300' :
                    'bg-red-500/20 text-red-700 dark:text-red-300'
                }`}>
                    {snippet.difficulty}
                </span>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-2">{snippet.description}</p>
            </div>
            <div className="relative bg-light-bg dark:bg-dark-bg p-4 font-mono text-sm text-light-text-primary dark:text-dark-text-primary mt-auto">
                <pre><code>{snippet.code}</code></pre>
                <button
                    onClick={handleCopy}
                    className="absolute top-2 right-2 px-2 py-1 text-xs bg-light-border dark:bg-dark-hover rounded hover:bg-gray-300 dark:hover:bg-dark-border transition-colors"
                >
                    {isCopied ? 'Copied!' : 'Copy'}
                </button>
            </div>
        </div>
    );
};

const LearnCoding: React.FC = () => {
  const [activeLanguage, setActiveLanguage] = useState<Language>('Python');
  const [searchTerm, setSearchTerm] = useState('');

  const activeSection = useMemo(() => {
    return PROBLEM_LIBRARY.find(section => section.language === activeLanguage);
  }, [activeLanguage]);

  const filteredSnippets = useMemo(() => {
    if (!activeSection) return [];
    if (!searchTerm) return activeSection.snippets;

    const lowercasedFilter = searchTerm.toLowerCase();
    return activeSection.snippets.filter(snippet =>
      snippet.title.toLowerCase().includes(lowercasedFilter) ||
      snippet.description.toLowerCase().includes(lowercasedFilter) ||
      snippet.code.toLowerCase().includes(lowercasedFilter)
    );
  }, [searchTerm, activeSection]);

  return (
    <div className="space-y-6 flex-grow flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex space-x-1 p-1 bg-light-panel dark:bg-dark-panel border border-light-border dark:border-dark-border rounded-lg">
                {LANGUAGES.map(lang => (
                    <button
                        key={lang}
                        onClick={() => setActiveLanguage(lang)}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                            activeLanguage === lang 
                            ? 'bg-cyan-500 text-white' 
                            : 'text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-border dark:hover:bg-dark-hover'
                        }`}
                    >
                        {lang}
                    </button>
                ))}
            </div>

            <div className="relative w-full md:w-auto">
                <input
                    type="text"
                    placeholder={`Search in ${activeLanguage}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-64 bg-light-panel dark:bg-dark-panel border border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                 <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
        </div>

      <section className="flex-grow">
        <h2 className="text-2xl font-bold text-light-text-primary dark:text-white mb-4 border-b-2 border-light-border dark:border-dark-border pb-2">
          {activeLanguage} Problems
        </h2>
        {filteredSnippets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSnippets.map((snippet) => (
                <SnippetCard key={snippet.id} snippet={snippet} />
                ))}
            </div>
        ) : (
            <div className="text-center py-16 bg-light-panel dark:bg-dark-panel rounded-lg border border-light-border dark:border-dark-border">
                <p className="text-light-text-secondary dark:text-dark-text-secondary">No problems found matching your search.</p>
            </div>
        )}
      </section>
    </div>
  );
};

export default LearnCoding;