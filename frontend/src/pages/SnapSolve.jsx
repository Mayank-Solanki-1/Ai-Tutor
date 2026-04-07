import { useState, useRef } from 'react';
import { aiService } from '../services/aiService';
import { UploadCloud, Image as ImageIcon, Loader2, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SnapSolve() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        return toast.error('Please upload an image file');
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null); // clear previous
    }
  };

  const handleSolve = async () => {
    if (!image) return;
    setIsUploading(true);
    
    // In a real app we'd convert to base64 or upload to a bucket
    // Here we simulate the api call
    try {
      const data = await aiService.solveImage('dummy_url_for_now');
      setResult(data);
      toast.success('Solution generated!');
    } catch (error) {
      toast.error('Failed to get solution');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-1">
        <h2 className="text-2xl font-bold text-gray-900">Snap & Solve</h2>
        <p className="text-gray-500">Upload a picture of your problem and get a step-by-step solution instantly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Upload Area */}
        <div className="glass-card p-6 flex flex-col h-full min-h-[400px]">
          <h3 className="font-semibold text-gray-900 mb-4">Upload Question</h3>
          
          <div 
            className={`flex-1 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-6 transition-all ${
              preview ? 'border-transparent bg-gray-50' : 'border-blue-200 bg-blue-50/50 hover:bg-blue-50 cursor-pointer'
            }`}
            onClick={() => !preview && fileInputRef.current?.click()}
          >
            {preview ? (
              <div className="relative w-full h-full flex flex-col items-center">
                <img src={preview} alt="Uploaded problem" className="max-h-64 object-contain rounded-lg shadow-sm border border-gray-200" />
                <button 
                  onClick={() => { setPreview(null); setImage(null); setResult(null); }}
                  className="mt-4 text-red-500 text-sm font-medium hover:text-red-700 transition-colors"
                >
                  Clear Image
                </button>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-4">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <p className="font-medium text-gray-700">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500 mt-1">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*"
            />
          </div>

          <button
            onClick={handleSolve}
            disabled={!preview || isUploading}
            className="mt-6 w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 disabled:opacity-50 transition-all shadow-lg shadow-blue-600/30"
          >
            {isUploading ? (
              <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Analyzing Image...</>
            ) : (
              <><ImageIcon className="w-5 h-5 mr-2" /> Solve Now</>
            )}
          </button>
        </div>

        {/* Result Area */}
        <div className={`glass-card p-6 flex flex-col h-full min-h-[400px] transition-all duration-500 ${result ? 'opacity-100 translate-y-0' : 'opacity-50'}`}>
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
            AI Solution
          </h3>
          
          {result ? (
            <div className="flex-1 space-y-6 overflow-y-auto">
               <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
                 <h4 className="text-sm font-semibold text-orange-800 mb-2">Step-by-step Solution:</h4>
                 <div className="text-gray-800 whitespace-pre-wrap text-sm leading-relaxed">
                   {result.solution}
                 </div>
               </div>
               
               <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                 <h4 className="text-sm font-semibold text-blue-800 mb-2">Simple Explanation:</h4>
                 <div className="text-gray-800 text-sm leading-relaxed">
                   {result.explanation}
                 </div>
               </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
              <ImageIcon className="w-12 h-12 mb-3 opacity-20" />
              <p className="text-sm">Upload an image and hit solve to see the magic.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
