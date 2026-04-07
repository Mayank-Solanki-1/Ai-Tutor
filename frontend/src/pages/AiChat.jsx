import { useState, useRef, useEffect } from 'react';
import { aiService } from '../services/aiService';
import { Send, Bot, User, Loader2, Sparkles, BookA } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AiChat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your AI Tutor. Ask me anything about your studies, or select a quick action below.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (textOveride) => {
    const textToSend = typeof textOveride === 'string' ? textOveride : message;
    if (!textToSend.trim()) return;

    const newMessages = [...messages, { role: 'user', content: textToSend }];
    setMessages(newMessages);
    setMessage('');
    setIsLoading(true);

    try {
      const data = await aiService.chat(textToSend, 'General discussion');
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      toast.error('Failed to get response');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
      <div className="flex flex-col space-y-1">
        <h2 className="text-2xl font-bold text-gray-900">AI Doubt Solver</h2>
        <p className="text-gray-500">Ask questions and get instant, contextual answers.</p>
      </div>

      <div className="flex-1 glass-card flex flex-col overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-orange-100 text-orange-600 ml-3' : 'bg-blue-100 text-blue-600 mr-3'}`}>
                  {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-md shadow-blue-600/20' 
                    : 'bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200'
                }`}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-2 bg-gray-100 p-4 rounded-2xl rounded-tl-none text-gray-500 text-sm border border-gray-200">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AI is thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Actions */}
        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/50 overflow-x-auto whitespace-nowrap flex space-x-2 scrollbar-hide">
          <button onClick={() => handleSend('Explain this simply')} className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all">
            <Sparkles className="w-3 h-3 mr-2" /> Explain simply
          </button>
          <button onClick={() => handleSend('Give me a real life example')} className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-all">
            <BookA className="w-3 h-3 mr-2" /> Give example
          </button>
          <button onClick={() => handleSend('Explain step-by-step')} className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-all">
            <Sparkles className="w-3 h-3 mr-2" /> Step-by-step
          </button>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask your doubt..."
              className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent block w-full p-3.5 outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!message.trim() || isLoading}
              className="p-3.5 bg-blue-600 text-white border border-blue-600 rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
