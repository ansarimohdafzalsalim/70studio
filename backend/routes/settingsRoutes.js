import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = Router();
router.get('/', getSettings);
router.put('/', protect, upload.single('founderPhoto'), updateSettings);
export default router;
