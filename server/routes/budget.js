import express from 'express';
import budgetController from '../controllers/budgetController.js';
import authMiddleware from '../middleware/authMw.js';

const router = express.Router();

// Protect calculation route
router.post('/calculate', authMiddleware, budgetController.calculateBudget);

export default router;