// FIX: Import React to resolve namespace errors for React types like Dispatch and SetStateAction.
import type React from 'react';

export type Page = 'Code Tutor' | 'Learn Coding A to Z' | 'Dashboard' | 'Python Path' | 'Profile' | 'Resources' | 'Get In Touch';
export type Theme = 'light' | 'dark';
export type Language = 'Python' | 'JavaScript' | 'Java' | 'C++' | 'C';
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Snippet {
  id: number;
  title: string;
  difficulty: Difficulty;
  description: string;
  code: string;
}

export interface LanguageSection {
  language: Language;
  snippets: Snippet[];
}

export interface RoadmapItem {
  id: string;
  title: string;
  code?: string;
  points: number;
}

export interface RoadmapSection {
  title: string;
  items: RoadmapItem[];
}

export interface User {
  name: string;
  avatar: string;
}

export interface AnalyticsData {
  problemsAnalyzed: number;
  successRate: number;
  streak: number;
  skillAreas: Record<Language, number>;
  weeklyProgress: { name: string; points: number }[];
  lastActivityTimestamp: number;
  recentActivity: {
    id: number;
    description: string;
    points: number;
    timestamp: string;
  }[];
  pythonPathPoints: number;
  completedPythonPathTasks: string[];
  analyzedCodeHashes: string[];
}

export interface AppContextType {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  theme: Theme;
  toggleTheme: () => void;
  points: number;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  analytics: AnalyticsData;
  setAnalytics: React.Dispatch<React.SetStateAction<AnalyticsData>>;
  codeToLoad: { code: string; language: Language; task: RoadmapItem | null } | null;
  setCodeToLoad: React.Dispatch<React.SetStateAction<{ code: string; language: Language; task: RoadmapItem | null } | null>>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isChatbotOpen: boolean;
  setIsChatbotOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}