import React from 'react';

interface AnalysisLoaderProps {
  progress: number;
  message: string;
}

const AnalysisLoader: React.FC<AnalysisLoaderProps> = ({ progress, message }) => {
  const circumference = 2 * Math.PI * 54; // 2 * pi * radius
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-light-panel dark:bg-dark-panel rounded-lg shadow-lg flex flex-col items-center justify-center h-full p-6 border border-light-border dark:border-dark-border">
      <div className="relative w-40 h-40">
        <svg className="w-full h-full" viewBox="0 0 120 120">
          <circle
            className="text-light-border dark:text-dark-border"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="54"
            cx="60"
            cy="60"
          />
          <circle
            className="text-cyan-500"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="54"
            cx="60"
            cy="60"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.3s' }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-light-text-primary dark:text-white">
          {Math.round(progress)}%
        </span>
      </div>
      <p className="mt-6 text-lg text-light-text-secondary dark:text-dark-text-primary">{message}</p>
    </div>
  );
};

export default AnalysisLoader;