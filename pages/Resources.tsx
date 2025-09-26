import React from 'react';
import { AcademicCapIcon, DownloadIcon, LinkIcon, PlayIcon } from '../components/icons';

interface Resource {
    title: string;
    description: string;
    link: string;
}

const resources = {
    websites: [
        { title: 'freeCodeCamp', description: 'A non-profit with thousands of free, interactive tutorials and a project-based curriculum.', link: 'https://www.freecodecamp.org/learn' },
        { title: 'The Odin Project', description: 'A free, open-source curriculum for learning full-stack web development with a focus on projects.', link: 'https://www.theodinproject.com/' },
        { title: 'Codecademy', description: 'Learn to code interactively with hands-on lessons and real-time feedback.', link: 'https://www.codecademy.com/' },
        { title: 'MDN Learn Web Development', description: "Mozilla's structured pathway for learning HTML, CSS, and JavaScript from scratch.", link: 'https://developer.mozilla.org/en-US/docs/Learn' },
    ],
    videos: [
        { title: 'freeCodeCamp.org', description: 'Full-length courses on almost any programming topic imaginable.', link: 'https://www.youtube.com/c/Freecodecamp' },
        { title: 'CS50', description: "Harvard's Introduction to Computer Science course.", link: 'https://www.youtube.com/c/cs50' },
    ],
    cheatsheets: [
        { title: 'Python Cheatsheet', description: 'A quick reference for Python basics by Real Python.', link: 'https://realpython.com/python-cheat-sheet/' },
        { title: 'JavaScript (ES6) Cheatsheet', description: 'A comprehensive guide to modern JavaScript features.', link: 'https://github.com/mbeaudru/modern-js-cheatsheet' },
    ],
    books: [
        { title: 'Automate the Boring Stuff with Python', description: 'A practical guide to Python for beginners. Available online for free.', link: 'https://automatetheboringstuff.com/' },
        { title: 'Eloquent JavaScript', description: 'A modern introduction to programming. Available online for free.', link: 'https://eloquentjavascript.net/' },
    ]
};

const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => (
    <a href={resource.link} target="_blank" rel="noopener noreferrer" className="block bg-light-panel dark:bg-dark-panel p-4 rounded-lg border border-light-border dark:border-dark-border hover:border-cyan-400 dark:hover:border-cyan-400 hover:shadow-lg transition-all duration-200">
        <h4 className="font-semibold text-light-text-primary dark:text-white">{resource.title}</h4>
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">{resource.description}</p>
    </a>
);

const ResourceSection: React.FC<{ title: string; resources: Resource[]; icon: React.ReactNode }> = ({ title, resources, icon }) => (
    <section>
        <h3 className="flex items-center text-xl font-bold text-light-text-primary dark:text-white mb-4">
            {icon}
            <span className="ml-3">{title}</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map(res => <ResourceCard key={res.title} resource={res} />)}
        </div>
    </section>
);


const Resources: React.FC = () => {
    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-bold text-light-text-primary dark:text-white mb-2">Learning Resources</h1>
                <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary">
                    Expand your knowledge with these curated resources from around the web.
                </p>
            </div>
            
            <ResourceSection 
                title="Websites & Docs" 
                resources={resources.websites} 
                icon={<LinkIcon className="w-6 h-6 text-cyan-400" />} 
            />
            <ResourceSection 
                title="Video Tutorials" 
                resources={resources.videos} 
                icon={<PlayIcon className="w-6 h-6 text-cyan-400" />} 
            />
            <ResourceSection 
                title="Cheatsheets" 
                resources={resources.cheatsheets} 
                icon={<DownloadIcon className="w-6 h-6 text-cyan-400" />} 
            />
             <ResourceSection 
                title="Recommended Books" 
                resources={resources.books} 
                icon={<AcademicCapIcon className="w-6 h-6 text-cyan-400" />} 
            />
        </div>
    );
};

export default Resources;
