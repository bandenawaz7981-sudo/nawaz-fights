
import React, { useState } from 'react';
import { ImageSize, AspectRatio } from '../types';
import { generateTravelImage, requestProKey, checkProKey } from '../geminiService';

const VisualizerView: React.FC = () => {
  const [prompt, setPrompt] = useState('A luxury villa over crystal clear blue water in Maldives, sunset, cinematic lighting');
  const [size, setSize] = useState<ImageSize>(ImageSize.S1K);
  const [ratio, setRatio] = useState<AspectRatio>(AspectRatio.A16_9);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    try {
        const hasKey = await checkProKey();
        if (!hasKey) {
            await requestProKey();
        }

        const imageUrl = await generateTravelImage(prompt, size, ratio);
        if (imageUrl) {
            setGeneratedImage(imageUrl);
        } else {
            alert("Failed to generate image. Please check your settings.");
        }
    } catch (error: any) {
        if (error.message === "PRO_KEY_REQUIRED") {
            await requestProKey();
        } else {
            alert("Error generating visual. Try a different prompt.");
        }
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-violet-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h14a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Destination Visualizer</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">What do you want to see?</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your dream destination..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 h-32 text-sm focus:ring-2 focus:ring-violet-500 outline-none transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Image Quality</label>
                <select 
                  value={size}
                  onChange={(e) => setSize(e.target.value as ImageSize)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-violet-500 outline-none"
                >
                  <option value={ImageSize.S1K}>Standard (1K)</option>
                  <option value={ImageSize.S2K}>High (2K)</option>
                  <option value={ImageSize.S4K}>Ultra (4K)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Aspect Ratio</label>
                <select 
                  value={ratio}
                  onChange={(e) => setRatio(e.target.value as AspectRatio)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-violet-500 outline-none"
                >
                  <option value={AspectRatio.A1_1}>Square (1:1)</option>
                  <option value={AspectRatio.A16_9}>Landscape (16:9)</option>
                  <option value={AspectRatio.A4_3}>Classic (4:3)</option>
                  <option value={AspectRatio.A3_4}>Tall (3:4)</option>
                  <option value={AspectRatio.A9_16}>Story (9:16)</option>
                </select>
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-violet-200 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Visual...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  Generate AI Visual
                </>
              )}
            </button>
          </div>

          {/* Result Area */}
          <div className="lg:col-span-7 flex flex-col min-h-[400px]">
            <div className={`flex-grow rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center relative transition-all ${generatedImage ? 'border-none shadow-2xl' : ''}`}>
              {isGenerating ? (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-slate-500 font-medium">Nano Banana Pro is painting your dream...</p>
                </div>
              ) : generatedImage ? (
                <img src={generatedImage} alt="Generated Travel Destination" className="w-full h-full object-contain" />
              ) : (
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h14a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-400">Visualizer Workspace</h3>
                  <p className="text-slate-400 text-sm max-w-xs mx-auto">Your AI-generated travel dreams will appear here. Try a specific prompt for best results!</p>
                </div>
              )}
            </div>
            
            {generatedImage && !isGenerating && (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-slate-500 italic">" {prompt} "</p>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors" title="Download">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors" title="Share">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizerView;
