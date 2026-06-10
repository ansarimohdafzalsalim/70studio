import { Router } from 'express';
import { createService, deleteService, listAdminServices, listServices, updateService } from '../controllers/serviceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/services', listServices);
router.get('/admin/services', protect, listAdminServices);
router.post('/admin/services', protect, createService);
router.put('/admin/services/:id', protect, updateService);
router.delete('/admin/services/:id', protect, deleteService);

export default router;
