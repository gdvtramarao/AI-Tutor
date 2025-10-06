import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CodeTutor from './pages/CodeTutor';
import Dashboard from './pages/Dashboard';
import PythonPath from './pages/PythonPath';
import Profile from './pages/Profile';
import Resources from './pages/Resources';
import LearnCoding from './pages/LearnCoding';
import GetInTouch from './pages/GetInTouch';
import MobileNav from './components/MobileNav';
import Chatbot from './components/Chatbot';
import { AppContext } from './context/AppContext';
import type { Page, Theme, AnalyticsData, Language, RoadmapItem, User } from './types';
import { FOOTER_QUOTES } from './constants';

const usePersistentState = <T,>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = window.localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
};


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Code Tutor');
  const [theme, setTheme] = usePersistentState<Theme>('app-theme', 'dark');
  const [points, setPoints] = usePersistentState<number>('app-points', 0);
  const [user, setUser] = usePersistentState<User>('app-user', { name: 'Student', avatar: '🧑‍💻' });
  const [codeToLoad, setCodeToLoad] = useState<{ code: string; language: Language; task: RoadmapItem | null } | null>(null);
  const [currentQuote, setCurrentQuote] = useState(FOOTER_QUOTES[0]);
  const [analytics, setAnalytics] = usePersistentState<AnalyticsData>('app-analytics', {
    errorsFixed: 0,
    successRate: 0,
    streak: 0,
    skillAreas: { Python: 0, JavaScript: 0, Java: 0, 'C++': 0, C: 0 },
    monthlyProgress: [
      { name: 'Jan', points: 0 }, { name: 'Feb', points: 0 },
      { name: 'Mar', points: 0 }, { name: 'Apr', points: 0 },
      { name: 'May', points: 0 }, { name: 'Jun', points: 0 },
      { name: 'Jul', points: 0 }, { name: 'Aug', points: 0 },
      { name: 'Sep', points: 0 }, { name: 'Oct', points: 0 },
      { name: 'Nov', points: 0 }, { name: 'Dec', points: 0 },
    ],
    recentActivity: [],
    pythonPathPoints: 0,
    completedPythonPathTasks: [],
  });

  useEffect(() => {
    const quoteInterval = setInterval(() => {
        setCurrentQuote(prevQuote => {
            const currentIndex = FOOTER_QUOTES.indexOf(prevQuote);
            const nextIndex = (currentIndex + 1) % FOOTER_QUOTES.length;
            return FOOTER_QUOTES[nextIndex];
        });
    }, 300000); // 5 minutes

    return () => clearInterval(quoteInterval);
  }, []);


  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }, [theme, setTheme]);
  
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const contextValue = useMemo(() => ({
    currentPage,
    setCurrentPage,
    theme,
    toggleTheme,
    points,
    setPoints,
    analytics,
    setAnalytics,
    codeToLoad,
    setCodeToLoad,
    user,
    setUser,
  }), [currentPage, setCurrentPage, theme, toggleTheme, points, analytics, codeToLoad, user, setAnalytics, setPoints, setCodeToLoad, setUser]);

  return (
    <AppContext.Provider value={contextValue}>
      <div className={`bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary min-h-screen flex flex-col md:flex-row transition-colors duration-300`}>
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-0">
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto flex flex-col pb-24 md:pb-6">
            <div style={{ display: currentPage === 'Profile' ? 'flex' : 'none' }} className="flex-grow flex flex-col">
              <Profile />
            </div>
            <div style={{ display: currentPage === 'Code Tutor' ? 'flex' : 'none' }} className="flex-grow flex flex-col">
              <CodeTutor />
            </div>
            <div style={{ display: currentPage === 'Learn Coding A to Z' ? 'flex' : 'none' }} className="flex-grow flex flex-col">
              <LearnCoding />
            </div>
            <div style={{ display: currentPage === 'Dashboard' ? 'flex' : 'none' }} className="flex-grow flex flex-col">
              <Dashboard />
            </div>
            <div style={{ display: currentPage === 'Python Path' ? 'flex' : 'none' }} className="flex-grow flex flex-col">
              <PythonPath />
            </div>
            <div style={{ display: currentPage === 'Resources' ? 'flex' : 'none' }} className="flex-grow flex flex-col">
                <Resources />
            </div>
            <div style={{ display: currentPage === 'Get In Touch' ? 'flex' : 'none' }} className="flex-grow flex flex-col">
                <GetInTouch />
            </div>
          </main>
          <MobileNav />
           <footer className="text-center py-4 text-light-text-secondary dark:text-dark-text-secondary text-sm px-4 hidden md:block">
               "{currentQuote}"
               <br />
                Created with ❤️ by gdvtramarao
            </footer>
        </div>
      </div>
      <Chatbot />
    </AppContext.Provider>
  );
};

export default App;