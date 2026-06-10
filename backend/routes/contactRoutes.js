import { Router } from 'express';
import { submitContact, listMessages, markRead, deleteMessage } from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();
router.post('/contact', submitContact);
router.get('/admin/messages', protect, listMessages);
router.put('/admin/messages/:id/read', protect, markRead);
router.delete('/admin/messages/:id', protect, deleteMessage);
export default router;
