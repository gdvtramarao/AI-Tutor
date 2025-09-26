import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import type { AppContextType } from '../types';
import { PencilIcon, CheckIcon, XIcon } from '../components/icons';
import { AVATARS } from '../constants';

const AvatarPicker: React.FC<{ onSelect: (avatar: string) => void; onClose: () => void }> = ({ onSelect, onClose }) => (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
        <div className="bg-light-panel dark:bg-dark-panel rounded-lg shadow-2xl p-6 border border-light-border dark:border-dark-border" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-white mb-4">Choose an Avatar</h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                {AVATARS.map(avatar => (
                    <button
                        key={avatar}
                        onClick={() => onSelect(avatar)}
                        className="text-4xl p-2 rounded-lg hover:bg-light-border dark:hover:bg-dark-hover transition-colors"
                    >
                        {avatar}
                    </button>
                ))}
            </div>
        </div>
    </div>
);


const Profile: React.FC = () => {
    const { user, setUser, points, analytics } = useContext(AppContext) as AppContextType;
    const [isEditingName, setIsEditingName] = useState(false);
    const [tempName, setTempName] = useState(user.name);
    const [showAvatarPicker, setShowAvatarPicker] = useState(false);

    const getLevel = (pts: number): string => {
        if (pts < 100) return 'Beginner';
        if (pts < 300) return 'Intermediate';
        if (pts < 600) return 'Advanced';
        return 'Pro Coder';
    };

    const handleNameSave = () => {
        if (tempName.trim()) {
            setUser({ ...user, name: tempName.trim() });
            setIsEditingName(false);
        }
    };
    
    const handleAvatarSelect = (avatar: string) => {
        setUser({ ...user, avatar });
        setShowAvatarPicker(false);
    };

    const level = getLevel(points);
    const problemsSolved = analytics.errorsFixed + analytics.completedPythonPathTasks.length;

    return (
        <div className="space-y-8">
            {showAvatarPicker && <AvatarPicker onSelect={handleAvatarSelect} onClose={() => setShowAvatarPicker(false)} />}

            <div className="flex flex-col md:flex-row items-center gap-6 bg-light-panel dark:bg-dark-panel p-8 rounded-lg shadow-lg border border-light-border dark:border-dark-border">
                <button 
                  onClick={() => setShowAvatarPicker(true)}
                  className="relative group"
                >
                    <span className="text-7xl md:text-8xl">{user.avatar}</span>
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <PencilIcon className="w-8 h-8 text-white" />
                    </div>
                </button>

                <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                         {isEditingName ? (
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={tempName}
                                    onChange={(e) => setTempName(e.target.value)}
                                    className="bg-light-bg dark:bg-dark-bg text-3xl font-bold text-light-text-primary dark:text-white rounded-md p-1 border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                    onKeyDown={(e) => e.key === 'Enter' && handleNameSave()}
                                />
                                <button onClick={handleNameSave} className="p-1 text-green-500 hover:text-green-400"><CheckIcon className="w-6 h-6" /></button>
                                <button onClick={() => setIsEditingName(false)} className="p-1 text-red-500 hover:text-red-400"><XIcon className="w-6 h-6" /></button>
                            </div>
                        ) : (
                            <>
                                <h1 className="text-3xl font-bold text-light-text-primary dark:text-white">{user.name}</h1>
                                <button onClick={() => { setIsEditingName(true); setTempName(user.name); }} className="text-light-text-secondary dark:text-dark-text-secondary hover:text-cyan-400 dark:hover:text-cyan-400">
                                    <PencilIcon className="w-5 h-5" />
                                </button>
                            </>
                        )}
                    </div>
                    <p className="text-lg text-cyan-400 font-semibold">{level}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-light-panel dark:bg-dark-panel p-6 rounded-lg shadow-lg border border-light-border dark:border-dark-border text-center">
                    <p className="text-4xl font-bold text-light-text-primary dark:text-white">{points}</p>
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">Total Points</p>
                </div>
                <div className="bg-light-panel dark:bg-dark-panel p-6 rounded-lg shadow-lg border border-light-border dark:border-dark-border text-center">
                    <p className="text-4xl font-bold text-light-text-primary dark:text-white">{problemsSolved}</p>
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">Problems Solved</p>
                </div>
            </div>

            <div className="bg-light-panel dark:bg-dark-panel p-6 rounded-lg shadow-lg border border-light-border dark:border-dark-border">
                <h3 className="text-xl font-semibold text-light-text-primary dark:text-white mb-4">Last 3 Activities</h3>
                <div className="space-y-4">
                    {analytics.recentActivity.length > 0 ? (
                        analytics.recentActivity.slice(0, 3).map(activity => (
                            <div key={activity.id} className="flex justify-between items-center bg-light-bg dark:bg-dark-bg/50 p-3 rounded-md">
                                <div>
                                    <p className="text-light-text-primary dark:text-white">{activity.description}</p>
                                    <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{new Date(activity.timestamp).toLocaleDateString()}</p>
                                </div>
                                <p className="font-bold text-green-500">+{activity.points} pts</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-light-text-secondary dark:text-dark-text-secondary">No recent activity yet. Analyze some code to get started!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;