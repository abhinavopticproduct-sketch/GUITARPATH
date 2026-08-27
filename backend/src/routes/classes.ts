import express from 'express';
import { getClasses, getClassById, createClass, updateClass, deleteClass } from '../controllers/classController';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateToken, getClasses);
router.get('/:id', authenticateToken, getClassById);
router.post('/', authenticateToken, authorizeRoles(['teacher', 'admin']), createClass);
router.put('/:id', authenticateToken, authorizeRoles(['teacher', 'admin']), updateClass);
router.delete('/:id', authenticateToken, authorizeRoles(['admin']), deleteClass);

export default router;
