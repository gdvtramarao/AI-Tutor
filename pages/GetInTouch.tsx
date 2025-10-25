import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import type { AppContextType } from '../types';

const SUBMISSION_LIMIT = 3;
const STORAGE_KEY = 'emailSubmissions';

interface SubmissionRecord {
  count: number;
  date: string; // YYYY-MM-DD
}

const getTodayDateString = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const checkSubmissionLimit = (email: string): { allowed: boolean; remaining: number } => {
    if (!email) return { allowed: true, remaining: SUBMISSION_LIMIT };
    const records = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const today = getTodayDateString();
    const userRecord: SubmissionRecord | undefined = records[email.toLowerCase()];

    if (!userRecord) {
        return { allowed: true, remaining: SUBMISSION_LIMIT };
    }

    if (userRecord.date === today) {
        if (userRecord.count >= SUBMISSION_LIMIT) {
            return { allowed: false, remaining: 0 };
        }
        return { allowed: true, remaining: SUBMISSION_LIMIT - userRecord.count };
    }

    // Record is from a previous day
    return { allowed: true, remaining: SUBMISSION_LIMIT };
};

const recordSubmission = (email: string) => {
    const records = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const today = getTodayDateString();
    const emailKey = email.toLowerCase();
    const userRecord: SubmissionRecord | undefined = records[emailKey];

    if (userRecord && userRecord.date === today) {
        records[emailKey].count++;
    } else {
        records[emailKey] = { count: 1, date: today };
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
};


const GetInTouch: React.FC = () => {
    const { user } = useContext(AppContext) as AppContextType;
    const [formData, setFormData] = useState({
        name: user.name === 'Student' ? '' : user.name,
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
    const [error, setError] = useState('');
    const [remainingSubmissions, setRemainingSubmissions] = useState(SUBMISSION_LIMIT);
    
    const FORM_ENDPOINT = "https://formspree.io/f/mzzjvyve";

    useEffect(() => {
        if (formData.email.toLowerCase().endsWith('@gmail.com')) {
            const { remaining } = checkSubmissionLimit(formData.email);
            setRemainingSubmissions(remaining);
        } else {
            setRemainingSubmissions(SUBMISSION_LIMIT);
        }
    }, [formData.email]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const { allowed } = checkSubmissionLimit(formData.email);
        if (!allowed) {
            setError(`You have reached the daily submission limit of ${SUBMISSION_LIMIT}. Please try again tomorrow.`);
            setStatus('error');
            return;
        }

        if (!formData.email.toLowerCase().endsWith('@gmail.com')) {
            setError('Please enter a valid Gmail address.');
            setStatus('error');
            return;
        }

        setStatus('sending');
        setError('');

        try {
            const response = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                recordSubmission(formData.email);
                setStatus('sent');
                setFormData({ name: user.name === 'Student' ? '' : user.name, email: '', message: '' });
            } else {
                const data = await response.json();
                if (data.errors) {
                    setError(data.errors.map((error: { message: string }) => error.message).join(", "));
                } else {
                    setError('An unknown error occurred while sending the message.');
                }
                setStatus('error');
            }
        } catch (err) {
            setError('Failed to send message. Please check your network connection.');
            setStatus('error');
        }
    };
    
    const resetForm = () => {
        setStatus('idle');
        setError('');
    }

    return (
        <div className="flex-grow flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-2xl mx-auto bg-light-panel dark:bg-dark-panel p-8 rounded-lg shadow-lg border border-light-border dark:border-dark-border">
                <h1 className="text-3xl font-bold text-center text-light-text-primary dark:text-white mb-2">Get In Touch</h1>
                <p className="text-center text-light-text-secondary dark:text-dark-text-secondary mb-8">Have a question or suggestion? Send a message!</p>
                
                {status === 'sent' && (
                    <div className="text-center p-4 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 rounded-lg">
                        <p className="font-semibold">Message Sent Successfully!</p>
                        <p className="text-sm mt-1">Thank you for reaching out. Your message has been delivered.</p>
                        <button onClick={resetForm} className="mt-4 text-sm font-semibold text-cyan-500 hover:underline">Send another message</button>
                    </div>
                )}

                {status === 'error' && (
                     <div className="text-center p-4 bg-red-500/10 text-red-700 dark:text-red-300 rounded-lg">
                        <p className="font-semibold">Message Failed</p>
                        <p className="text-sm mt-1">{error}</p>
                        <button onClick={resetForm} className="mt-2 text-sm font-semibold text-cyan-500 hover:underline">Try again</button>
                    </div>
                )}
                
                {(status === 'idle' || status === 'sending') && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary rounded-md p-3 border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">Your Gmail Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                pattern=".+@gmail\.com"
                                title="Please enter a valid Gmail address (e.g., example@gmail.com)."
                                className="w-full bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary rounded-md p-3 border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            />
                             <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
                                Only Gmail addresses are accepted. You can send up to {SUBMISSION_LIMIT} messages per day. Remaining: {remainingSubmissions}.
                            </p>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">Your Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="w-full bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary rounded-md p-3 border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className="w-full py-3 px-4 bg-cyan-500 text-white font-semibold rounded-md hover:bg-cyan-400 disabled:bg-cyan-500/70 disabled:cursor-wait transition-all duration-200"
                        >
                            {status === 'sending' ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default GetInTouch;