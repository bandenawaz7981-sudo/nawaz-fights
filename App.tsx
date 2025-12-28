
import React, { useState, useEffect } from 'react';
import { View } from './types';
import Navigation from './components/Navigation';
import FlightView from './views/FlightView';
import HotelView from './views/HotelView';
import AIAssistantView from './views/AIAssistantView';
import VisualizerView from './views/VisualizerView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('flights');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">FlyHigh</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => setCurrentView('flights')}
              className={`text-sm font-medium transition-colors ${currentView === 'flights' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
            >
              Flights
            </button>
            <button 
              onClick={() => setCurrentView('hotels')}
              className={`text-sm font-medium transition-colors ${currentView === 'hotels' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
            >
              Hotels
            </button>
            <button 
              onClick={() => setCurrentView('ai-assistant')}
              className={`text-sm font-medium transition-colors ${currentView === 'ai-assistant' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
            >
              AI Assistant
            </button>
            <button 
              onClick={() => setCurrentView('visualizer')}
              className={`text-sm font-medium transition-colors ${currentView === 'visualizer' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
            >
              Visualizer
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden sm:block text-sm font-medium text-slate-600 hover:text-indigo-600">Login</button>
            <button className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition-all shadow-md">Get Started</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'flights' && <FlightView />}
        {currentView === 'hotels' && <HotelView />}
        {currentView === 'ai-assistant' && <AIAssistantView />}
        {currentView === 'visualizer' && <VisualizerView />}
      </main>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 glass-effect border-t border-slate-200 z-50">
        <div className="flex justify-around items-center h-16">
          <button onClick={() => setCurrentView('flights')} className={`flex flex-col items-center gap-1 ${currentView === 'flights' ? 'text-indigo-600' : 'text-slate-500'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-[10px] uppercase font-bold tracking-wider">Flights</span>
          </button>
          <button onClick={() => setCurrentView('hotels')} className={`flex flex-col items-center gap-1 ${currentView === 'hotels' ? 'text-indigo-600' : 'text-slate-500'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-[10px] uppercase font-bold tracking-wider">Hotels</span>
          </button>
          <button onClick={() => setCurrentView('ai-assistant')} className={`flex flex-col items-center gap-1 ${currentView === 'ai-assistant' ? 'text-indigo-600' : 'text-slate-500'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="text-[10px] uppercase font-bold tracking-wider">AI Bot</span>
          </button>
          <button onClick={() => setCurrentView('visualizer')} className={`flex flex-col items-center gap-1 ${currentView === 'visualizer' ? 'text-indigo-600' : 'text-slate-500'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h14a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-[10px] uppercase font-bold tracking-wider">Visual</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
