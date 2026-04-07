import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import YouTubeTutor from './pages/YouTubeTutor';
import AiChat from './pages/AiChat';
import SnapSolve from './pages/SnapSolve';
import QuizGenerator from './pages/QuizGenerator';
import ProgressTracker from './pages/ProgressTracker';
import StudyPlanner from './pages/StudyPlanner';

const NotFound = () => <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-center text-gray-500"><h2>Page not found</h2></div>;

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="youtube-tutor" element={<YouTubeTutor />} />
        <Route path="ask-ai" element={<AiChat />} />
        <Route path="snap-solve" element={<SnapSolve />} />
        <Route path="quiz" element={<QuizGenerator />} />
        <Route path="progress" element={<ProgressTracker />} />
        <Route path="study-planner" element={<StudyPlanner />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
