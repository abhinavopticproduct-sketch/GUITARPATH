import express from 'express';
import { getStudentProgress, getStudentAnalytics, updateStudentProfile } from '../controllers/studentController';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = express.Router();

router.get('/:id/progress', authenticateToken, authorizeRoles(['teacher', 'admin']), getStudentProgress);
router.get('/:id/analytics', authenticateToken, authorizeRoles(['teacher', 'admin']), getStudentAnalytics);
router.put('/profile', authenticateToken, updateStudentProfile);

export default router;
