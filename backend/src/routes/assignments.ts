import express from 'express';
import { getAssignments, createAssignment, updateAssignment, deleteAssignment } from '../controllers/assignmentController';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateToken, getAssignments);
router.post('/', authenticateToken, authorizeRoles(['teacher', 'admin']), createAssignment);
router.put('/:id', authenticateToken, authorizeRoles(['teacher', 'admin']), updateAssignment);
router.delete('/:id', authenticateToken, authorizeRoles(['admin']), deleteAssignment);

export default router;
