import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import type { AppContextType, Page } from '../types';
import { SunIcon, MoonIcon, FireIcon } from './icons';

const Header: React.FC = () => {
  const { theme, toggleTheme, points, analytics, currentPage, setCurrentPage } = useContext(AppContext) as AppContextType;

  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-8 bg-light-panel dark:bg-dark-panel border-b border-light-border dark:border-dark-border">
      <div className="flex items-center">
        <h2 className="text-lg font-semibold text-light-text-primary dark:text-white">{currentPage}</h2>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-yellow-500">
            <span className="font-bold text-lg">{points}</span>
            <span className="text-sm">Points</span>
        </div>
         <div className="flex items-center space-x-1 text-orange-500">
            <FireIcon className="w-5 h-5" />
            <span className="font-bold text-lg">{analytics.streak}</span>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-border dark:hover:bg-dark-hover hover:text-light-text-primary dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-panel dark:focus:ring-offset-dark-panel focus:ring-cyan-500 transition-colors duration-200"
        >
          {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
        </button>
      </div>
      <div className="md:hidden">
         {/* Mobile Nav Button can go here if needed */}
      </div>
    </header>
  );
};

export default Header;