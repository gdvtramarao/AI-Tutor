import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import type { AppContextType, Page } from '../types';
import { CodeIcon, BookOpenIcon, ChartBarIcon, MapIcon, UserCircleIcon, LinkIcon } from './icons';

const NavItem: React.FC<{
  pageName: Page;
  icon: React.ReactNode;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}> = ({ pageName, icon, currentPage, setCurrentPage }) => {
  const isActive = currentPage === pageName;
  return (
    <button
      onClick={() => setCurrentPage(pageName)}
      className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
        isActive
          ? 'bg-cyan-500/20 text-cyan-400'
          : 'text-dark-text-secondary hover:bg-dark-hover hover:text-white'
      }`}
    >
      {icon}
      <span className="ml-3">{pageName}</span>
    </button>
  );
};

const Sidebar: React.FC = () => {
  const { currentPage, setCurrentPage } = useContext(AppContext) as AppContextType;

  return (
    <aside className="w-64 bg-light-panel dark:bg-dark-panel border-r border-light-border dark:border-dark-border flex-col hidden md:flex">
      <div className="flex flex-col flex-grow p-4">
        <div className="flex items-center flex-shrink-0 px-4 py-2 mb-4">
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold text-light-text-primary dark:text-white">AI Tutor</h1>
            <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">by gdvtramarao</span>
          </div>
        </div>
        <nav className="flex-1 space-y-2">
          <NavItem
            pageName="Code Tutor"
            icon={<CodeIcon className="w-6 h-6" />}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <NavItem
            pageName="Python Path"
            icon={<MapIcon className="w-6 h-6" />}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <NavItem
            pageName="Learn Coding A to Z"
            icon={<BookOpenIcon className="w-6 h-6" />}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <NavItem
            pageName="Dashboard"
            icon={<ChartBarIcon className="w-6 h-6" />}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <NavItem
            pageName="Resources"
            icon={<LinkIcon className="w-6 h-6" />}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <NavItem
            pageName="Profile"
            icon={<UserCircleIcon className="w-6 h-6" />}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;