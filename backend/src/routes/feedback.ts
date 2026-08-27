import express from 'express';
import { createFeedback, getStudentFeedback, getTeacherFeedback } from '../controllers/feedbackController';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticateToken, authorizeRoles(['teacher', 'admin']), createFeedback);
router.get('/student/:studentId', authenticateToken, getStudentFeedback);
router.get('/teacher/:teacherId', authenticateToken, authorizeRoles(['teacher', 'admin']), getTeacherFeedback);

export default router;
