import express from 'express';
import tripController from '../controllers/tripController.js';
import authMiddleware from '../middleware/authMw.js';

const router = express.Router();

// Protected route so req.user is available
router.post('/generate', authMiddleware, tripController.generateTrip);

export default router;