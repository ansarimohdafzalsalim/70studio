import { Router } from 'express';
import { deleteSubscriber, listSubscribers, subscribe, updateSubscriber } from '../controllers/subscriberController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/subscribe', subscribe);
router.get('/admin/subscribers', protect, listSubscribers);
router.put('/admin/subscribers/:id', protect, updateSubscriber);
router.delete('/admin/subscribers/:id', protect, deleteSubscriber);

export default router;
