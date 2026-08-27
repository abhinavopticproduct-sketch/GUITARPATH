import express from 'express';
import { startPractice, submitPracticeResult, getPracticeHistory } from '../controllers/practiceController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/start', authenticateToken, startPractice);
router.post('/:id/result', authenticateToken, submitPracticeResult);
router.get('/history', authenticateToken, getPracticeHistory);

export default router;
