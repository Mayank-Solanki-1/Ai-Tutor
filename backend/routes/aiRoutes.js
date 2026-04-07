import express from 'express';
import { generateNotes, chat, solveImage, generateQuiz } from '../controllers/aiController.js';

const router = express.Router();

router.post('/generate-notes', generateNotes);
router.post('/chat', chat);
router.post('/solve-image', solveImage);
router.post('/generate-quiz', generateQuiz);

export default router;
