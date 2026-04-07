import { GoogleGenerativeAI } from '@google/generative-ai';

// Controller structure to gracefully fallback to mock data if API key is invalid
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_api_key_here') {
    return null;
  }
  return new GoogleGenerativeAI(apiKey);
};

export const generateNotes = async (req, res, next) => {
  try {
    const { videoUrl } = req.body;
    if (!videoUrl) return res.status(400).json({ error: 'videoUrl is required' });

    const genAI = getGeminiClient();
    if (!genAI) {
      // Mock logic
      return res.json({
        notes: [
          "This is a mock note based on the video.",
          "Concepts: Machine Learning, Neural Networks",
          "Summary: This video explains the basics of AI in a simple way."
        ],
        mockMode: true
      });
    }

    // Since we don't have a real transcript extractor for YouTube right now, 
    // we instruct Gemini to give general mock notes for any URL, or you can implement a real transcript fetcher.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Assume this is an educational video URL: ${videoUrl}. Give me 3 smart note bullet points, Key Concepts, and a Simplified Explanation about what this video most likely contains based on the URL context.`;
    
    const result = await model.generateContent(prompt);
    res.json({ notes: result.response.text().split("\n").filter(line => line.trim() !== ""), mockMode: false });
  } catch (error) {
    next(error);
  }
};

export const chat = async (req, res, next) => {
  try {
    const { message, context } = req.body;
    if (!message) return res.status(400).json({ error: 'message is required' });

    const genAI = getGeminiClient();
    if (!genAI) {
      return res.json({ reply: `(Mock AI) You asked: "${message}". Context: ${context ? 'provided' : 'none'}` });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Context: ${context || 'None'}. User: ${message}. Respond helpfully and educationally.`;
    
    const result = await model.generateContent(prompt);
    res.json({ reply: result.response.text() });
  } catch (error) {
    next(error);
  }
};

export const solveImage = async (req, res, next) => {
  try {
    const { imageUrl } = req.body; // In reality this would be form-data with file upload, kept simple for now
    if (!imageUrl) return res.status(400).json({ error: 'imageUrl or image base64 is required' });

    const genAI = getGeminiClient();
    if (!genAI) {
      return res.json({
        solution: "1. Define variables\n2. Solve equation\n3. Answer is X.",
        explanation: "This is a mock step-by-step solution for the provided image.",
        mockMode: true
      });
    }

    // Real implementation would pass base64 image inlineData to gemini-1.5-flash
    res.json({ solution: "Real vision implementation requires uploading the image buffer to Gemini.", mockMode: false });
  } catch (error) {
    next(error);
  }
};

export const generateQuiz = async (req, res, next) => {
  try {
    const { topics } = req.body;
    
    const genAI = getGeminiClient();
    const parsedTopics = topics || "General Knowledge";

    if (!genAI) {
      return res.json({
        quiz: [
          {
            question: `What is a core concept of ${parsedTopics}?`,
            options: ["Option A", "Option B", "Option C", "Option D"],
            answer: 0,
            explanation: "Option A is the correct answer because it directly correlates with the topic."
          }
        ],
        mockMode: true
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Generate 1 multiple choice question about: ${parsedTopics}. Return valid JSON string (do not use markdown formatting blocks like \`\`\`json) with this exact structure: [{ "question": "...", "options": ["A","B","C","D"], "answer": 0, "explanation": "..." }]`;
    
    const result = await model.generateContent(prompt);
    const jsonStr = result.response.text();
    let quizData;
    try {
      quizData = JSON.parse(jsonStr.replace(/```json/g, '').replace(/```/g, ''));
    } catch(e) {
       quizData = { error: "Failed to parse generation", raw: jsonStr };
    }
    
    res.json({ quiz: quizData, mockMode: false });
  } catch (error) {
    next(error);
  }
};
