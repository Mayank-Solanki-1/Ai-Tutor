import { useState } from 'react';
import { aiService } from '../services/aiService';
import { useStore } from '../store/useStore';
import { Search, Youtube as YoutubeIcon, Sparkles, Loader2, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';

export default function YouTubeTutor() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { currentNotes, setCurrentNotes } = useStore();

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!url) return toast.error('Please enter a YouTube URL');
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) return toast.error('Please enter a valid YouTube URL');
    
    setIsLoading(true);
    try {
      const data = await aiService.generateNotes(url);
      setCurrentNotes(data.notes);
      toast.success('Notes generated successfully!');
    } catch (error) {
      toast.error('Failed to generate notes');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">YouTube AI Tutor</h2>
        <p className="text-gray-500">Transform passive video watching into active learning.</p>
      </div>

      <div className="glass-card p-6">
        <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <YoutubeIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Paste YouTube Video URL here..."
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-70"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Sparkles className="w-5 h-5 mr-2" />}
            Generate Notes
          </button>
        </form>
      </div>

      {currentNotes && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="glass-card overflow-hidden">
            <div className="aspect-video bg-gray-900 w-full relative group flex items-center justify-center">
              <span className="text-gray-400 text-sm">Video Player Placeholder</span>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <button className="px-4 py-2 bg-white/20 backdrop-blur text-white rounded-lg border border-white/40 hover:bg-white/30 transition-all flex items-center">
                   <YoutubeIcon className="w-5 h-5 mr-2 text-red-500" />
                   Simulate Video Play
                 </button>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>Active Tracking</span>
              </div>
              <button 
                className="text-sm px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                onClick={() => toast('Select a timestamp to activate Gemini!', { icon: '💡' })}
              >
                Explain This Part
              </button>
            </div>
          </div>

          <div className="glass-card p-6 h-[500px] flex flex-col">
            <div className="flex items-center space-x-2 mb-4 border-b border-gray-100 pb-4">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-lg text-gray-900">AI Generated Notes</h3>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {currentNotes.map((note, index) => (
                <div key={index} className="p-4 bg-blue-50 rounded-xl text-gray-700 text-sm leading-relaxed border border-blue-100 hover:shadow-sm transition-shadow">
                  {note}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
