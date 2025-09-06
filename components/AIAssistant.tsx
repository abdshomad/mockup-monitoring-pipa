import React, { useState, useRef, useEffect } from 'react';
import { ICONS } from '../constants';
import { useGeminiChat } from '../hooks/useGeminiChat';
import Message from './ai/Message';
import PromptSuggestions from './ai/PromptSuggestions';
import { View, SensorType } from '../types';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: View;
  sensorFilter: SensorType | null;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose, currentView, sensorFilter }) => {
  const [input, setInput] = useState('');
  const { messages, loading, sendMessage } = useGeminiChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, loading]);

  const handleSend = () => {
    if (input.trim() && !loading) {
      sendMessage(input.trim());
      setInput('');
    }
  };

  const handlePromptSelect = (prompt: string) => {
    setInput('');
    sendMessage(prompt);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div 
      className={`chat-window fixed bottom-8 right-8 bg-slate-800 rounded-2xl shadow-2xl w-full max-w-[400px] h-[600px] flex flex-col border border-slate-700 z-40 ${isOpen ? 'open' : 'closed'}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-assistant-title"
    >
      <header className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
        <div className="flex items-center text-purple-400">
          <span className="mr-3 h-6 w-6">{ICONS.ai}</span>
          <h2 id="ai-assistant-title" className="text-lg font-bold text-white">AI Assistant</h2>
        </div>
        <button 
          onClick={onClose} 
          className="p-1 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
          aria-label="Close"
        >
          {ICONS.close}
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4 chat-message-container">
        {messages.length === 0 && !loading && <PromptSuggestions onSelect={handlePromptSelect} currentView={currentView} sensorFilter={sensorFilter} />}
        {messages.map((msg, index) => (
          <Message key={index} role={msg.role} content={msg.content} />
        ))}
        {loading && messages[messages.length-1]?.role === 'model' && messages[messages.length-1]?.content === '' && (
            <div className="flex justify-start">
                 <div className="p-3 rounded-lg bg-slate-700 text-slate-200 rounded-bl-none">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </main>
      
      <footer className="p-4 border-t border-slate-700 flex-shrink-0">
        <div className="flex items-center space-x-2 bg-slate-700 rounded-lg p-2">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about alerts, sensors..."
            className="w-full bg-transparent text-slate-200 placeholder-slate-400 text-sm focus:outline-none resize-none"
            rows={1}
            disabled={loading}
          />
          <button 
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="p-2 rounded-full bg-cyan-500 text-white hover:bg-cyan-600 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
            aria-label="Send message"
          >
            {ICONS.send}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default AIAssistant;