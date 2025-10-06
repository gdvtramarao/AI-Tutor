import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import type { AppContextType, Page } from '../types';
import { CodeIcon, MapIcon, ChartBarIcon, UserCircleIcon, MailIcon, BookOpenIcon, LinkIcon } from './icons';

const NavButton: React.FC<{
  pageName: Page;
  label: string;
  icon: React.ReactNode;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}> = ({ pageName, label, icon, currentPage, setCurrentPage }) => {
  const isActive = currentPage === pageName;
  return (
    <button
      onClick={() => setCurrentPage(pageName)}
      className={`flex flex-col items-center justify-center w-full pt-2 pb-1 text-xs transition-colors duration-200 ${
        isActive ? 'text-cyan-400' : 'text-dark-text-secondary hover:text-white'
      }`}
      aria-label={pageName}
    >
      {icon}
      <span className="mt-1">{label}</span>
    </button>
  );
};


const MobileNav: React.FC = () => {
    const { currentPage, setCurrentPage } = useContext(AppContext) as AppContextType;

    const navPages: { pageName: Page; label: string; icon: React.ReactNode }[] = [
        { pageName: 'Code Tutor', label: 'Code', icon: <CodeIcon className="w-6 h-6" /> },
        { pageName: 'Python Path', label: 'Path', icon: <MapIcon className="w-6 h-6" /> },
        { pageName: 'Learn Coding A to Z', label: 'Learn', icon: <BookOpenIcon className="w-6 h-6" /> },
        { pageName: 'Dashboard', label: 'Stats', icon: <ChartBarIcon className="w-6 h-6" /> },
        { pageName: 'Resources', label: 'Links', icon: <LinkIcon className="w-6 h-6" /> },
        { pageName: 'Profile', label: 'Profile', icon: <UserCircleIcon className="w-6 h-6" /> },
        { pageName: 'Get In Touch', label: 'Contact', icon: <MailIcon className="w-6 h-6" /> },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-light-panel dark:bg-dark-panel border-t border-light-border dark:border-dark-border z-40">
            <div className="flex justify-around">
                {navPages.map(({ pageName, label, icon }) => (
                     <NavButton
                        key={pageName}
                        pageName={pageName}
                        label={label}
                        icon={icon}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                ))}
            </div>
        </nav>
    );
};

export default MobileNav;