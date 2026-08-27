import express from 'express';
import { getLessons, getLessonById, createLesson, updateLesson, deleteLesson, completeLesson } from '../controllers/lessonController';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = express.Router();

router.get('/', getLessons);
router.get('/:id', getLessonById);
router.post('/', authenticateToken, authorizeRoles(['admin', 'teacher']), createLesson);
router.put('/:id', authenticateToken, authorizeRoles(['admin', 'teacher']), updateLesson);
router.delete('/:id', authenticateToken, authorizeRoles(['admin']), deleteLesson);
router.post('/:id/complete', authenticateToken, completeLesson);

export default router;
