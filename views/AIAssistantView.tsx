
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { generateAIResponse, requestProKey, checkProKey } from '../geminiService';

const AIAssistantView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am your FlyHigh AI Travel Assistant. I can help you find flights, book hotels, and plan your entire journey. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usePro, setUsePro] = useState(false);
  const [useThinking, setUseThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
        if (usePro) {
            const hasKey = await checkProKey();
            if (!hasKey) {
                await requestProKey();
            }
        }

        const history = messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
        }));

        const responseText = await generateAIResponse(userMessage, history, usePro, useThinking);
        setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error: any) {
        if (error.message === "PRO_KEY_REQUIRED") {
            setMessages(prev => [...prev, { role: 'model', text: "A Pro API key is required for this model. Please select your key via the dialog." }]);
            await requestProKey();
        } else {
            setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error. Please try again." }]);
        }
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
      {/* Header Controls */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="font-bold text-slate-800">Travel Assistant</h2>
        </div>
        
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
              <input 
                type="checkbox" 
                checked={usePro} 
                onChange={(e) => {
                  setUsePro(e.target.checked);
                  if (!e.target.checked) setUseThinking(false);
                }}
                className="sr-only" 
              />
              <div className={`w-10 h-6 rounded-full transition-colors ${usePro ? 'bg-indigo-600' : 'bg-slate-300'}`}></div>
              <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${usePro ? 'translate-x-4' : ''}`}></div>
            </div>
            <span className="text-xs font-semibold text-slate-600 group-hover:text-indigo-600">Pro Mode</span>
          </label>

          <label className={`flex items-center gap-2 cursor-pointer group ${!usePro ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <div className="relative">
              <input 
                type="checkbox" 
                checked={useThinking} 
                disabled={!usePro}
                onChange={(e) => setUseThinking(e.target.checked)}
                className="sr-only" 
              />
              <div className={`w-10 h-6 rounded-full transition-colors ${useThinking ? 'bg-amber-500' : 'bg-slate-300'}`}></div>
              <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${useThinking ? 'translate-x-4' : ''}`}></div>
            </div>
            <span className="text-xs font-semibold text-slate-600 group-hover:text-amber-600">Thinking</span>
          </label>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-grow overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                : 'bg-slate-100 text-slate-800 border border-slate-200'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-slate-100 rounded-2xl p-4 border border-slate-200 flex items-center gap-2">
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <span className="text-xs text-slate-400 ml-2">{useThinking ? 'Thinking deeply...' : 'FlyHigh AI is typing...'}</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-slate-50 border-t border-slate-200">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex items-center gap-3"
        >
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={useThinking ? "Ask a complex travel query..." : "Ask about flights, hotels, or plan a trip..."}
            className="flex-grow bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-90" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </form>
        <p className="text-[10px] text-center text-slate-400 mt-2">
          Powered by Gemini {usePro ? '3 Pro' : '2.5 Flash-Lite'}. 
          {useThinking && ' Deep thinking mode enabled.'}
        </p>
      </div>
    </div>
  );
};

export default AIAssistantView;
