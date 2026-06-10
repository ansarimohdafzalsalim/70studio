import { Router } from 'express';
import { createRevenue, deleteRevenue, getRevenueSummary, listRevenue, updateRevenue } from '../controllers/revenueController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/admin/revenue', protect, listRevenue);
router.get('/admin/revenue/summary', protect, getRevenueSummary);
router.post('/admin/revenue', protect, createRevenue);
router.put('/admin/revenue/:id', protect, updateRevenue);
router.delete('/admin/revenue/:id', protect, deleteRevenue);

export default router;
