import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Target, TrendingUp, AlertCircle } from 'lucide-react';

const data = [
  { name: 'Week 1', score: 65 },
  { name: 'Week 2', score: 70 },
  { name: 'Week 3', score: 68 },
  { name: 'Week 4', score: 85 },
  { name: 'Week 5', score: 92 },
];

export default function ProgressTracker() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-1">
        <h2 className="text-2xl font-bold text-gray-900">Progress Tracker</h2>
        <p className="text-gray-500">Track your learning journey and identify areas for improvement.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="glass-card p-6 border-l-4 border-blue-500">
           <div className="flex items-center text-gray-600 mb-2">
             <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
             <h3 className="font-medium">Learning Velocity</h3>
           </div>
           <p className="text-2xl font-bold text-gray-900">+15%</p>
           <p className="text-sm text-gray-500 mt-1">Faster than last month</p>
         </div>

         <div className="glass-card p-6 border-l-4 border-orange-500">
           <div className="flex items-center text-gray-600 mb-2">
             <Target className="w-5 h-5 mr-2 text-orange-500" />
             <h3 className="font-medium">Goal Completion</h3>
           </div>
           <p className="text-2xl font-bold text-gray-900">7/10</p>
           <p className="text-sm text-gray-500 mt-1">Weekly modules finished</p>
         </div>

         <div className="glass-card p-6 border-l-4 border-red-500">
           <div className="flex items-center text-gray-600 mb-2">
             <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
             <h3 className="font-medium">Weak Topics</h3>
           </div>
           <p className="text-2xl font-bold text-gray-900">Calculus</p>
           <p className="text-sm text-gray-500 mt-1">Suggested for review</p>
         </div>
      </div>

      <div className="glass-card p-6 h-96 mt-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-6">Aggregate Performance (Quizzes)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="name" stroke="#6B7280" tickLine={false} axisLine={false} />
            <YAxis stroke="#6B7280" tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="#3b82f6" 
              strokeWidth={4}
              dot={{ r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 8, fill: '#fb923c', strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-card p-6">
         <h3 className="font-semibold text-gray-900 mb-4">Personalized Recommendations</h3>
         <div className="space-y-3">
           <div className="p-4 bg-orange-50 text-orange-800 rounded-xl flex items-start">
             <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
             <div>
               <p className="font-medium">Focus on Integration (Calculus)</p>
               <p className="text-sm mt-1 opacity-90">Your recent quiz scores in this area are below average. Re-watch the video tutor for chapter 4.</p>
             </div>
           </div>
           <div className="p-4 bg-blue-50 text-blue-800 rounded-xl flex items-start">
             <TrendingUp className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
             <div>
               <p className="font-medium">Great job on React Basics!</p>
               <p className="text-sm mt-1 opacity-90">You scored 100% on your last 3 quizzes. Ready for advanced hooks?</p>
             </div>
           </div>
         </div>
      </div>
    </div>
  );
}
