import { useState } from 'react';
import { aiService } from '../services/aiService';
import { useStore } from '../store/useStore';
import { BrainCircuit, Loader2, ArrowRight, Save, LayoutList } from 'lucide-react';
import toast from 'react-hot-toast';

export default function QuizGenerator() {
  const [topic, setTopic] = useState('');
  const [quizLoading, setQuizLoading] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const { addQuizScore } = useStore();

  const handleGenerateQuiz = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return toast.error("Please enter a topic");
    
    setQuizLoading(true);
    setSelectedAnswer(null);
    setShowExplanation(false);
    try {
      const data = await aiService.generateQuiz(topic);
      if(data.quiz && data.quiz.length > 0) {
        setCurrentQuiz(data.quiz[0]); // Render first question for now
      } else {
        toast.error("Format error in generation");
      }
    } catch (error) {
      toast.error('Failed to generate quiz');
    } finally {
      setQuizLoading(false);
    }
  };

  const handleAnswerSelect = (index) => {
    if (showExplanation) return; // Prevent changing after selection
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    const isCorrect = index === currentQuiz.answer;
    addQuizScore(isCorrect ? 100 : 0);
    
    if (isCorrect) toast.success('Correct!');
    else toast.error('Incorrect. Check the explanation.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2 mb-8">
        <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
          <BrainCircuit className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">AI Quiz Generator</h2>
        <p className="text-gray-500">Test your knowledge with AI-generated MCQs tailored to your topics.</p>
      </div>

      <div className="glass-card p-2 sm:p-3 rounded-full flex mx-auto max-w-2xl shadow-sm border border-gray-100">
        <form onSubmit={handleGenerateQuiz} className="flex-1 flex items-center bg-white rounded-full overflow-hidden px-4">
          <LayoutList className="w-5 h-5 text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="What topic do you want to test? (e.g. Mitochondria)" 
            className="flex-1 py-3 outline-none w-full text-gray-700"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <button 
            type="submit"
            disabled={quizLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2.5 font-medium transition-colors ml-2 disabled:opacity-70 flex items-center shadow-md shadow-blue-500/20 whitespace-nowrap"
          >
            {quizLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : 'Generate'}
          </button>
        </form>
      </div>

      {currentQuiz && (
        <div className="glass-card p-8 mt-8 max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-300">
          <div className="flex justify-between items-center mb-6">
             <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold uppercase tracking-wider">Question 1</span>
          </div>
          
          <h3 className="text-xl font-medium text-gray-900 mb-6 leading-relaxed">
            {currentQuiz.question}
          </h3>

          <div className="space-y-3">
            {currentQuiz.options.map((option, idx) => {
              let btnClass = "w-full text-left p-4 rounded-xl border transition-all ";
              
              if (showExplanation) {
                if (idx === currentQuiz.answer) {
                  btnClass += "bg-green-50 border-green-500 text-green-900";
                } else if (idx === selectedAnswer) {
                  btnClass += "bg-red-50 border-red-300 text-red-900";
                } else {
                  btnClass += "bg-white border-gray-200 text-gray-500 opacity-50";
                }
              } else {
                btnClass += "bg-white border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-700";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(idx)}
                  disabled={showExplanation}
                  className={btnClass}
                >
                  <div className="flex items-center">
                     <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 font-medium text-sm ${showExplanation && idx === currentQuiz.answer ? 'bg-green-200 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                       {String.fromCharCode(65 + idx)}
                     </span>
                     {option}
                  </div>
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className="mt-8 p-6 bg-blue-50/50 rounded-2xl border border-blue-100 animate-in fade-in slide-in-from-top-4">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                Explanation <ArrowRight className="w-4 h-4 ml-2" />
              </h4>
              <p className="text-blue-800 text-sm leading-relaxed">
                {currentQuiz.explanation}
              </p>
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => handleGenerateQuiz(new Event('submit'))}
                  className="px-6 py-2 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm shadow-sm"
                >
                   Next Question
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
