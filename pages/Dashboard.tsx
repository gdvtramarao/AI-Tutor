import React, { useContext, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AppContext } from '../context/AppContext';
import { PYTHON_PATH_DATA } from '../constants';
import type { AppContextType } from '../types';
import { FireIcon, AcademicCapIcon, CodeIcon } from '../components/icons';

const COLORS = ['#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const StatCard: React.FC<{ title: string; value: string | number; icon?: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-light-panel dark:bg-dark-panel p-6 rounded-lg shadow-lg flex items-center space-x-4 border border-light-border dark:border-dark-border">
        {icon}
        <div>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{title}</p>
            <p className="text-2xl font-bold text-light-text-primary dark:text-white">{value}</p>
        </div>
    </div>
);

const Dashboard: React.FC = () => {
    const { analytics, theme, points } = useContext(AppContext) as AppContextType;

    const skillData = Object.entries(analytics.skillAreas).map(([name, value]) => ({ name, value }));
    const hasSkillData = skillData.some(d => d.value > 0);

    const totalPythonTasks = useMemo(() => PYTHON_PATH_DATA.reduce((acc, section) => acc + section.items.length, 0), []);

    const tooltipStyle = {
        backgroundColor: theme === 'dark' ? '#161B22' : '#FFFFFF',
        border: `1px solid ${theme === 'dark' ? '#30363D' : '#E5E7EB'}`
    };

    const axisStrokeColor = theme === 'dark' ? '#8B949E' : '#6B7280';
    const gridStrokeColor = theme === 'dark' ? '#30363D' : '#E5E7EB';


    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Points" value={points} />
                <StatCard 
                    title="Python Path Tasks" 
                    value={`${analytics.completedPythonPathTasks.length} / ${totalPythonTasks}`}
                    icon={<AcademicCapIcon className="w-8 h-8 text-cyan-400" />} 
                />
                <StatCard 
                    title="Code Tutor Problems" 
                    value={analytics.errorsFixed}
                    icon={<CodeIcon className="w-8 h-8 text-emerald-400" />} 
                />
                <StatCard 
                    title="Current Streak" 
                    value={analytics.streak} 
                    icon={<FireIcon className="w-8 h-8 text-orange-400" />} 
                />
            </div>

             <div className="bg-light-panel dark:bg-dark-panel p-6 rounded-lg shadow-lg border border-light-border dark:border-dark-border">
                <h3 className="text-lg font-semibold text-light-text-primary dark:text-white mb-4">Python Path Progress</h3>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-6">Your progress through the Python learning roadmap.</p>
                <div className="space-y-6">
                    {PYTHON_PATH_DATA.map(section => {
                        const totalTasks = section.items.length;
                        if (totalTasks === 0) return null;
                        
                        const completedCount = section.items.filter(item => analytics.completedPythonPathTasks.includes(item.id)).length;
                        const progressPercentage = (completedCount / totalTasks) * 100;

                        return (
                             <div key={section.title}>
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-semibold text-light-text-primary dark:text-white">{section.title}</h4>
                                    <span className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">{completedCount} / {totalTasks}</span>
                                </div>
                                <div className="w-full bg-light-border dark:bg-dark-hover rounded-full h-2.5">
                                    <div 
                                        className="bg-cyan-500 h-2.5 rounded-full transition-all duration-500" 
                                        style={{ width: `${progressPercentage}%` }}>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-light-panel dark:bg-dark-panel p-6 rounded-lg shadow-lg border border-light-border dark:border-dark-border">
                    <h3 className="text-lg font-semibold text-light-text-primary dark:text-white mb-4">Monthly Progress (General Points)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={analytics.monthlyProgress}>
                            <CartesianGrid strokeDasharray="3 3" stroke={gridStrokeColor} />
                            <XAxis dataKey="name" stroke={axisStrokeColor} />
                            <YAxis stroke={axisStrokeColor} />
                            <Tooltip contentStyle={tooltipStyle} />
                            <Legend />
                            <Bar dataKey="points" fill="#06b6d4" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-light-panel dark:bg-dark-panel p-6 rounded-lg shadow-lg border border-light-border dark:border-dark-border">
                    <h3 className="text-lg font-semibold text-light-text-primary dark:text-white mb-4">Skill Areas (Code Analysis)</h3>
                    {hasSkillData ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={skillData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                                    {skillData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                </Pie>
                                <Tooltip contentStyle={tooltipStyle} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-full text-light-text-secondary dark:text-dark-text-secondary">
                            <p>Analyze some code to see your skill breakdown!</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-light-panel dark:bg-dark-panel p-6 rounded-lg shadow-lg border border-light-border dark:border-dark-border">
                <h3 className="text-lg font-semibold text-light-text-primary dark:text-white mb-4">Recent Activity</h3>
                <div className="space-y-4">
                    {analytics.recentActivity.length > 0 ? (
                        analytics.recentActivity.map(activity => (
                            <div key={activity.id} className="flex justify-between items-center bg-light-bg dark:bg-dark-bg/50 p-3 rounded-md">
                                <div>
                                    <p className="text-light-text-primary dark:text-white">{activity.description}</p>
                                    <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{new Date(activity.timestamp).toLocaleString()}</p>
                                </div>
                                <p className="font-bold text-green-500">+{activity.points} pts</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-light-text-secondary dark:text-dark-text-secondary">No recent activity.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;