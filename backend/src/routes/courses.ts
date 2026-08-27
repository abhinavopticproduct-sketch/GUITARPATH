import express from 'express';
import { getCourses, getCourseById, createCourse, updateCourse, deleteCourse } from '../controllers/courseController';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = express.Router();

router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/', authenticateToken, authorizeRoles(['admin', 'teacher']), createCourse);
router.put('/:id', authenticateToken, authorizeRoles(['admin', 'teacher']), updateCourse);
router.delete('/:id', authenticateToken, authorizeRoles(['admin']), deleteCourse);

export default router;
