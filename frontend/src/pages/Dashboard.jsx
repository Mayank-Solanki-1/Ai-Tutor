import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useStore } from '../store/useStore';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';

const data = [
  { name: 'Mon', score: 85 },
  { name: 'Tue', score: 90 },
  { name: 'Wed', score: 75 },
  { name: 'Thu', score: 88 },
  { name: 'Fri', score: 92 },
];

export default function Dashboard() {
  const { user } = useStore();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-500">Your AI learning journey overview</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 flex flex-col">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-gray-700">Topics Mastered</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
          <span className="text-sm text-green-500 mt-2">+2 this week</span>
        </div>
        
        <div className="glass-card p-6 flex flex-col">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-orange-100 rounded-lg text-orange-500">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-gray-700">Quiz Average</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-2">86%</p>
          <span className="text-sm text-green-500 mt-2">+5% from last week</span>
        </div>

        <div className="glass-card p-6 flex flex-col">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg text-green-600">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-gray-700">Study Hours</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-2">24h</p>
          <span className="text-sm text-gray-500 mt-2">This month</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-6">Performance Trend</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-gray-900">Watched "Intro to React"</span>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-gray-900">Completed "JavaScript Basics" Quiz</span>
              <span className="text-xs text-green-500">Score: 92%</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-gray-900">Asked AI about "Hooks"</span>
              <span className="text-xs text-gray-500">Yesterday</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
