import { Router } from 'express';
import { listProjects, getProject, createProject, updateProject, deleteProject } from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = Router();
const projectUpload = upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'images', maxCount: 8 }]);

router.get('/projects', listProjects);
router.get('/projects/:slug', getProject);
router.get('/admin/projects', protect, listProjects);
router.post('/admin/projects', protect, projectUpload, createProject);
router.put('/admin/projects/:id', protect, projectUpload, updateProject);
router.delete('/admin/projects/:id', protect, deleteProject);

export default router;
