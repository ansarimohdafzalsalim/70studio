import { Router } from 'express';
import { createClient, deleteClient, getClientSummary, listClients, updateClient } from '../controllers/clientController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/admin/clients', protect, listClients);
router.get('/admin/clients/summary', protect, getClientSummary);
router.post('/admin/clients', protect, createClient);
router.put('/admin/clients/:id', protect, updateClient);
router.delete('/admin/clients/:id', protect, deleteClient);

export default router;
