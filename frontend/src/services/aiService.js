import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/ai';

export const aiService = {
  generateNotes: async (videoUrl) => {
    const response = await axios.post(`${API_URL}/generate-notes`, { videoUrl });
    return response.data;
  },
  chat: async (message, context) => {
    const response = await axios.post(`${API_URL}/chat`, { message, context });
    return response.data;
  },
  solveImage: async (imageUrl) => {
    const response = await axios.post(`${API_URL}/solve-image`, { imageUrl });
    return response.data;
  },
  generateQuiz: async (topics) => {
    const response = await axios.post(`${API_URL}/generate-quiz`, { topics });
    return response.data;
  }
};
