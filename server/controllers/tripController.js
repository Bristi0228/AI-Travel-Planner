import { GoogleGenAI } from '@google/genai';
import { v4 as uuidv4 } from 'uuid';
import Trip from '../models/Trip.js';

const geminiai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Generate personalizes trip according to user need
const generateTrip = async (req, res) => {
    try {
        // 1. Ensure user is authenticated
        if (!req.user?._id) {
            return res.status(401).json({ message: 'Authentication required to generate a trip' });
        }


        // 2. Declear all the variables, constants and take input from the frontend
        const { destination, inputs = {} } = req.body;
        if (!destination) {
            return res.status(400).json({ message: 'Destination is required' });
        }

        const duration = parseInt(inputs.duration) || 3;
        const travellers = parseInt(inputs.numTravelers) || 1;
        const travelStyle = inputs.travelStyle || 'Standard';

        let interests;
        if (Array.isArray(inputs.interest)) {
            interests = inputs.interest.join(', ');
        } else {
            interests = 'general sightseeing';
        }

        let budget;
        if (inputs.budgetMin && inputs.budgetMax) {
            budget = `${inputs.budgetMin} to ${inputs.budgetMax}`;
        } else {
            budget = 'moderate';
        }


        // 3. Build prompt including all user preferences
        const prompt = `Create a travel itinerary for ${destination} for ${duration} days with ${travellers} traveler(s).
        Travel Style: ${travelStyle}
        Interests: ${interests}
        Budget: ${budget}

        Respond ONLY in valid JSON matching this exact structure:
        {
            "itinerary": {
                "days": [
                    {
                        "day": 1,
                        "theme": "Theme Title",
                        "neighborhood": "Area Name",
                        "estimatedDailyCost": 150,
                        "morning": { "activity": "...", "description": "...", "location": "...", "estimatedCost": 20, "tips": "..." },
                        "afternoon": { "activity": "...", "description": "...", "location": "...", "estimatedCost": 50, "tips": "..." },
                        "evening": { "activity": "...", "description": "...", "location": "...", "estimatedCost": 80, "tips": "..." }
                    }
                ]
            },
            "insights": [
                { "title": "Local Secret", "content": "..." }
            ],
            "packingList": {
                "essentials": ["Passport"],
                "clothing": ["Jackets"],
                "gear": ["Camera"],
                "documents": ["Insurance"]
            }
        }`;

        // 4. Call Gemini API
        const response = await geminiai.models.generateContent({
            model: 'gemini-3.6-flash',
            contents: prompt,
            config: {
                systemInstruction: 'You are an expert travel planner. Always return strict, valid JSON.',
                responseMimeType: 'application/json',
            },
        });

        // 5. Safely parse LLM JSON
        let tripData;
        try {
            tripData = JSON.parse(response.text);
        } catch (parseError) {
            console.error('Failed to parse Gemini output:', response.text);
            return res.status(502).json({ message: 'Invalid data format received from AI model' });
        }

        // 6. Persist trip to database
        const newTrip = await Trip.create({
            userId: req.user._id,
            destination,
            input: {
                ...inputs,
                duration,
                numTravelers: travellers,
            },
            itinerary: tripData,
            shareId: uuidv4(),
        });

        return res.status(201).json({
            status: 'success',
            data: newTrip,
        });

    } catch (error) {
        console.error('Trip Generation Error:', error);
        return res.status(400).json({ message: 'Failed to generate trip', error: error.message });
    }
};

export default {
    generateTrip,
};