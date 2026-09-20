import { GoogleGenAI } from '@google/genai';
import axios from 'axios';
import Budget from '../models/Budget.js';


const geminiai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const COST_MULTIPLIERS = {
    accomodation: {
        hostel: 35,
        "budget-hotel": 85,
        "mid-range": 160,
        boutique: 240,
        luxury: 450,
        airbnb: 130,
    },
    food: {
        "street-food": 28,
        casual: 50,
        mix: 80,
        restaurants: 120,
        "fine-dining": 250,
    },
};

const SEASON_FACTORS = { peak: 1.3, shoulder: 1., "off-peak": 0.75 };

const calculateBudget = async (req, res) => {
    try {
        const { destination, input = {} } = req.body;

        if (!destination) {
            return res.status(400).json({ error: "Destination is required" });
        }

        const duration = Math.max(1, parseInt(inputs.duration) || 1);
        const numTravelers = Math.max(1, parseInt(inputs.numTravelers) || 1);
        const accomodationType = inputs.accomodationType || "mid-range";
        const dailyFoodPreference = inputs.dailyFoodPreference || "mix";
        const travelSeason = inputs.travelSeason || "shoulder";
        const userCurrency = (inputs.userCurrency || "INR").toUpperCase();

        let exchangeRate = 1;
        try {
            const rateRes = await axios.get(`paste the link`, { timeout: 4000, });
            exchangeRate = rateRes.data.rates[userCurrency] || 1;
        } catch (e) {
            console.log("Currency API Failed, defaulting to INR (1.0)");
        }

        const seasonMult = SEASON_FACTORS[travelSeason] || 1;
        const baseAccommodation = (COST_MULTIPLIERS.accomodation[accomodationType] || 160) * seasonMult;
        const baseFood = (COST_MULTIPLIERS.food(dailyFoodPreference) || 80) * seasonMult;
        const breakdown = {
            accomodation: Math.round(baseAccommodation * duration * exchangeRate),
            food: Math.round(baseFood * numTravelers * exchangeRate),
            transport: Math.round(25 * duration * numTravelers * exchangeRate),
            insurance: Math.round(10 * duration * numTravelers * exchangeRate),
        };

        const subtotal = Object.values(breakdown).reduce((a, b) => a + b, 0);
        const miscellaneous = Math.round(subtotal * 0.1);
        const emergencyBuffer = Math.round((subtotal + miscellaneous) * 0.15);
        const total = subtotal + miscellaneous + emergencyBuffer;

        const budget = await Budget.create({
            userId: req.user._id,
            destination,
            currency: userCurrency,
            inputs: {...inputs, duration, numTravelers, userCurrency},
            breakdown: {...breakdown, miscellaneous, emergencyBuffer, total}
        })

        return res.status(201).json({budget, exchangeRateUsed: exchangeRate});
    } catch (error) {
        console.error("Budget Calculation Error : ", error);
        return res.status(500).json({ error: "Budget calculation failed", details: error.message });
    }
};

export default{
    calculateBudget
};