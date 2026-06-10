import { Router } from 'express';
import { createTeamMember, deleteTeamMember, listAdminTeam, listTeam, updateTeamMember } from '../controllers/teamController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = Router();

router.get('/team', listTeam);
router.get('/admin/team', protect, listAdminTeam);
router.post('/admin/team', protect, upload.single('photo'), createTeamMember);
router.put('/admin/team/:id', protect, upload.single('photo'), updateTeamMember);
router.delete('/admin/team/:id', protect, deleteTeamMember);

export default router;
