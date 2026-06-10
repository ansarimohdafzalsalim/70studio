import { Router } from 'express';
import { createStory, deleteStory, listAdminStories, listStories, updateStory } from '../controllers/storyController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/stories', listStories);
router.get('/admin/stories', protect, listAdminStories);
router.post('/admin/stories', protect, createStory);
router.put('/admin/stories/:id', protect, updateStory);
router.delete('/admin/stories/:id', protect, deleteStory);

export default router;
