import express from 'express';
import tripController from '../controllers/tripController.js';
import authMiddleware from '../middleware/authMw.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: 'Error', errors: errors.array() });
    };
    next();
};
const generate = [
    body("destination").notEmpty().withMessage("Destination is required").trim(),
    body("input.numTravelers").isInt({ min: 1 }).withMessage("Must have at least 1 traveler"),
    body("inputs.travelStyle").notEmpty().withMessage("Travel style is required"),
    body("input.interests").isArray({ min: 1 }).withMessage("Please select at least one interest"),
]

// Protecting Routes [Require JWT token]
router.use(authMiddleware);

// Protected route so req.user is available
router.post('/generate', tripController.generateTrip);

export default router;