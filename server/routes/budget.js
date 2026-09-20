import express from 'express';
import { calculateBudget } from '../controllers/budgetController.js';

const router = express.Router();

router.post('/calculate', calculateBudget);

export default router;