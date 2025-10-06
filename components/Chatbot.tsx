import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatBubbleIcon, XIcon, ThoughtIcon } from './icons';
import { startChat } from '../services/geminiService';
import type { Chat } from '@google/genai';
import type { ChatMessage } from '../types';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(() => localStorage.getItem('chatbotOpened') === 'true');
  const [isThinking, setIsThinking] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const suggestions = ["What is the Python Path?", "How do I earn points?", "Who made this app?"];

  useEffect(() => {
    setShowGreeting(true);
    const timer = setTimeout(() => setShowGreeting(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isOpen && !hasBeenOpened) {
        setIsThinking(true);
        setTimeout(() => setIsThinking(false), 2000); 
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isOpen, hasBeenOpened]);

  useEffect(() => {
    if (isOpen && !chatRef.current) {
      chatRef.current = startChat();
      setMessages([
        { role: 'model', content: "Hi! I'm Liki, the AI Assistant. Ask me anything about this app!" }
      ]);
      setShowSuggestions(true);
    }
  }, [isOpen]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim() || isLoading || !chatRef.current) return;

    const userMessage: ChatMessage = { role: 'user', content: message };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setShowSuggestions(false);
    setIsLoading(true);

    try {
      const stream = await chatRef.current.sendMessageStream({ message });
      
      let fullResponse = "";
      setMessages(prev => [...prev, { role: 'model', content: '' }]); 

      for await (const chunk of stream) {
        const chunkText = chunk.text;
        fullResponse += chunkText;
        setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage.role === 'model') {
                 lastMessage.content = fullResponse;
            }
            return newMessages;
        });
      }

    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length-1];
        if (lastMessage.role === 'model' && lastMessage.content === '') {
             newMessages[newMessages.length - 1] = { role: 'model', content: "Sorry, I'm having trouble connecting. Please try again later." };
             return newMessages;
        }
        return [...newMessages, { role: 'model', content: "Sorry, I'm having trouble connecting. Please try again later." }]
      });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };
  
  const handleSuggestionClick = (question: string) => {
      sendMessage(question);
  };

  const handleOpenChat = () => {
      setIsOpen(true);
      if (!hasBeenOpened) {
          setHasBeenOpened(true);
          localStorage.setItem('chatbotOpened', 'true');
      }
  };

  return (
    <>
      <div className={`fixed bottom-20 md:bottom-6 right-6 z-50 transition-transform duration-300 transform ${isOpen ? 'scale-0' : 'scale-100'}`}>
        <div className="relative">
          <div
            className={`absolute bottom-full mb-3 right-0 w-max bg-cyan-500 text-white text-sm font-semibold py-2 px-4 rounded-lg rounded-br-none shadow-lg transform transition-all duration-300 ease-in-out origin-bottom-right ${showGreeting ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
            role="status" aria-live="polite"
          >
            Chat with Liki!
            <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] transform translate-y-full -translate-x-[1px] border-t-cyan-500"></div>
          </div>
          
          <button
            onClick={handleOpenChat}
            className={`bg-cyan-500 text-white p-4 rounded-full shadow-lg hover:bg-cyan-400 transition-all duration-300 ${!hasBeenOpened ? 'animate-breathing' : ''}`}
            aria-label="Open AI Assistant"
          >
            <div className="relative w-8 h-8">
              <ChatBubbleIcon className="w-8 h-8" isThinking={isThinking && !hasBeenOpened} />
            </div>
          </button>
        </div>
      </div>


      <div className={`fixed bottom-20 md:bottom-6 right-6 w-[calc(100%-3rem)] max-w-sm h-[70vh] max-h-[600px] bg-light-panel dark:bg-dark-panel rounded-lg shadow-2xl flex flex-col z-50 border border-light-border dark:border-dark-border transition-transform duration-300 ease-in-out ${isOpen ? 'transform translate-y-0 opacity-100' : 'transform translate-y-16 opacity-0 pointer-events-none'}`}>
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-light-border dark:border-dark-border flex-shrink-0">
          <h3 className="font-semibold text-light-text-primary dark:text-white">AI Assistant</h3>
          <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-light-border dark:hover:bg-dark-hover">
              <XIcon className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'model' && (
                <div className="w-8 h-8 rounded-full bg-light-border dark:bg-dark-hover flex items-center justify-center flex-shrink-0">
                    <ThoughtIcon className="w-5 h-5 text-cyan-400" />
                </div>
              )}
              <div className={`max-w-[85%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-cyan-500 text-white' : 'bg-light-bg dark:bg-dark-hover text-light-text-primary dark:text-dark-text-primary'}`}>
                <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              </div>
            </div>
          ))}
          {isLoading && (
              <div className="flex items-end gap-2 justify-start">
                  <div className="w-8 h-8 rounded-full bg-light-border dark:bg-dark-hover flex items-center justify-center flex-shrink-0">
                      <ThoughtIcon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="max-w-[85%] p-3 rounded-lg bg-light-bg dark:bg-dark-hover text-light-text-primary dark:text-dark-text-primary">
                      <p className="text-sm italic">Liki is typing...</p>
                  </div>
              </div>
          )}
           {showSuggestions && (
            <div className="flex flex-col items-start gap-2 pt-2">
                {suggestions.map((q) => (
                    <button 
                        key={q}
                        onClick={() => handleSuggestionClick(q)}
                        className="text-sm text-cyan-500 bg-cyan-500/10 px-3 py-1.5 rounded-full hover:bg-cyan-500/20 transition-colors"
                    >
                        {q}
                    </button>
                ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-light-border dark:border-dark-border">
          <form onSubmit={handleFormSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              disabled={isLoading}
              className="flex-1 bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary rounded-md p-2 border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50"
            />
            <button type="submit" disabled={isLoading || !input.trim()} className="px-4 py-2 bg-cyan-500 text-white font-semibold rounded-md hover:bg-cyan-400 disabled:bg-gray-400 dark:disabled:bg-gray-600">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chatbot;