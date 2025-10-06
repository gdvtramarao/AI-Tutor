import React, { useState, useRef, useEffect } from 'react';
import { ChatBubbleIcon, XIcon } from './icons';
import { startChat } from '../services/geminiService';
import type { Chat } from '@google/genai';
import type { ChatMessage } from '../types';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false); // New state for greeting
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // This effect runs only once on mount for the greeting
  useEffect(() => {
    // Show the greeting immediately on component mount
    setShowGreeting(true);

    // Set a timer to hide it after 3 seconds
    const timer = setTimeout(() => {
        setShowGreeting(false);
    }, 3000);

    // Clean up the timer when the component unmounts
    return () => {
        clearTimeout(timer);
    };
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    if (isOpen && !chatRef.current) {
      chatRef.current = startChat();
      setMessages([
        { role: 'model', content: "Hi! I'm Liki, the AI Assistant. Ask me anything about this app!" }
      ]);
    }
  }, [isOpen]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !chatRef.current) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const stream = await chatRef.current.sendMessageStream({ message: input });
      
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
  };

  return (
    <>
      <div className={`fixed bottom-20 md:bottom-6 right-6 z-50 transition-transform duration-300 transform ${isOpen ? 'scale-0' : 'scale-100'}`}>
        <div className="relative">
           {/* Greeting Bubble */}
          <div
            className={`
              absolute bottom-full mb-3 right-0 w-max
              bg-cyan-500 text-white text-sm font-semibold 
              py-2 px-4 rounded-lg rounded-br-none shadow-lg
              transform transition-all duration-300 ease-in-out origin-bottom-right
              ${showGreeting ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
            `}
            role="status"
            aria-live="polite"
          >
            Chat with Liki!
            {/* Speech bubble pointer */}
            <div 
              className="absolute bottom-0 right-0 w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] transform translate-y-full -translate-x-[1px] border-t-cyan-500"
            ></div>
          </div>
          
          <button
            onClick={() => setIsOpen(true)}
            className="bg-cyan-500 text-white p-4 rounded-full shadow-lg hover:bg-cyan-400 transition-colors duration-300"
            aria-label="Open AI Assistant"
          >
            <ChatBubbleIcon className="w-8 h-8" />
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
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-cyan-500 text-white' : 'bg-light-bg dark:bg-dark-hover text-light-text-primary dark:text-dark-text-primary'}`}>
                <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') || (isLoading && index === messages.length - 1 ? '<span class="italic">typing...</span>' : '') }} />
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-light-border dark:border-dark-border">
          <form onSubmit={handleSendMessage} className="flex gap-2">
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