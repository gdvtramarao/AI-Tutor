import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { PYTHON_PATH_DATA } from '../constants';
import type { AppContextType } from '../types';
import type { RoadmapSection, RoadmapItem } from '../types';
import { ChevronRightIcon } from '../components/icons';

const CollapsibleSectionComponent: React.FC<{ section: RoadmapSection }> = ({ section }) => {
    const [isOpen, setIsOpen] = useState(section.title === '1. Basics'); // Open first section by default
    const { setCurrentPage, setCodeToLoad, analytics } = useContext(AppContext) as AppContextType;

    const handleTopicClick = (item: RoadmapItem) => {
        if (item.code) {
            setCodeToLoad({ code: item.code, language: 'Python', task: item });
            setCurrentPage('Code Tutor');
        }
    };

    return (
        <div className="bg-light-panel dark:bg-dark-panel rounded-lg border border-light-border dark:border-dark-border mb-4 overflow-hidden">
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="w-full flex justify-between items-center p-4 text-left font-semibold text-lg text-light-text-primary dark:text-white hover:bg-light-border/40 dark:hover:bg-dark-hover/40 transition-colors duration-200 focus:outline-none"
                aria-expanded={isOpen}
            >
                <span>{section.title}</span>
                <ChevronRightIcon className={`w-6 h-6 transform transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
            </button>
            {isOpen && (
                <div className="p-4 border-t border-light-border dark:border-dark-border">
                    <ul className="space-y-2">
                        {section.items.map((item) => {
                            const isCompleted = analytics.completedPythonPathTasks.includes(item.id);
                            return (
                                <li key={item.title}>
                                    <button 
                                        onClick={() => handleTopicClick(item)} 
                                        className="w-full text-left p-3 rounded-md text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-border dark:hover:bg-dark-hover hover:text-light-text-primary dark:hover:text-dark-text-primary transition-colors duration-200 flex items-center"
                                        disabled={!item.code}
                                    >
                                       <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${isCompleted ? 'bg-emerald-500' : 'bg-light-border dark:bg-dark-border'}`}>
                                            {isCompleted && (
                                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                        <span>{item.title}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};


const PythonPath: React.FC = () => {
    return (
        <div className="flex-grow">
            <h1 className="text-3xl font-bold text-light-text-primary dark:text-white mb-4">Python Learning Path</h1>
            <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary mb-8">
                A step-by-step roadmap for learning Python. Click on a topic to load a task into the Code Tutor.
            </p>
            <div>
                {PYTHON_PATH_DATA.map((section) => (
                    <CollapsibleSectionComponent key={section.title} section={section} />
                ))}
            </div>
        </div>
    );
};
export default PythonPath;