import { create } from 'zustand';

export const useStore = create((set) => ({
  user: {
    name: 'Student',
    progress: 45 // 45% overall completion
  },
  setUser: (user) => set({ user }),
  
  // Chat History
  chatHistory: [],
  addChatMessage: (message) => set((state) => ({ 
    chatHistory: [...state.chatHistory, message] 
  })),

  // Video Notes
  currentNotes: null,
  setCurrentNotes: (notes) => set({ currentNotes: notes }),

  // Quiz Performance
  quizScores: [],
  addQuizScore: (score) => set((state) => ({
    quizScores: [...state.quizScores, score]
  }))
}));
