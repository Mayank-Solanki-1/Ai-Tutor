import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Youtube, 
  MessageSquare, 
  Camera, 
  CheckSquare, 
  BarChart2, 
  Calendar 
} from 'lucide-react';
import { motion } from 'framer-motion';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'YouTube Tutor', href: '/youtube-tutor', icon: Youtube },
  { name: 'Ask AI', href: '/ask-ai', icon: MessageSquare },
  { name: 'Snap & Solve', href: '/snap-solve', icon: Camera },
  { name: 'Quiz', href: '/quiz', icon: CheckSquare },
  { name: 'Progress', href: '/progress', icon: BarChart2 },
  { name: 'Study Planner', href: '/study-planner', icon: Calendar },
];

export default function Sidebar({ isOpen }) {
  const location = useLocation();

  return (
    <div className={`fixed inset-y-0 left-0 bg-white border-r border-gray-200 w-64 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-auto z-30 transition-transform duration-300 ease-in-out`}>
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-center h-16 border-b border-gray-200 px-4">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-400 bg-clip-text text-transparent">AI Multi Tutor</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 w-1 h-8 bg-blue-600 rounded-r-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
