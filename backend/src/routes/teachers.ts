import express from 'express';
import { getTeacherStudents, getTeacherClasses } from '../controllers/teacherController';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = express.Router();

router.get('/:id/students', authenticateToken, authorizeRoles(['teacher', 'admin']), getTeacherStudents);
router.get('/:id/classes', authenticateToken, authorizeRoles(['teacher', 'admin']), getTeacherClasses);

export default router;
