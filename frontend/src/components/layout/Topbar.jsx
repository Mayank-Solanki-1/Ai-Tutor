import { Menu, Bell, User } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function Topbar({ onMenuClick }) {
  const { user } = useStore();

  return (
    <header className="h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 lg:px-8 z-20">
      <div className="flex items-center lg:hidden">
        <button
          onClick={onMenuClick}
          className="p-2 -mr-2 text-gray-500 hover:bg-gray-100 rounded-lg focus:outline-none"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
      
      <div className="flex-1 hidden lg:flex items-center">
        <h1 className="text-xl font-semibold text-gray-800">Welcome back, {user.name}! 👋</h1>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border border-blue-200">
            <User className="w-5 h-5" />
          </div>
          <span className="font-medium text-sm text-gray-700 hidden sm:block">{user.name}</span>
        </div>
      </div>
    </header>
  );
}
