import { GoogleGenAI } from '@google/genai';
import { v4 as uuidv4 } from 'uuid';
import Trip from '../models/Trip.js';


const geminiai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const generateTrip = async (req, res) => {
    try {
        // Guard clause: ensure user is authenticated
        if (!req.user?._id) {
            return res.status(401).json({ message: 'Authentication required to generate a trip' });
        }

        const { destination, inputs = {} } = req.body;
        if (!destination) {
            return res.status(400).json({ message: 'Destination is required' });
        }

        const duration = parseInt(inputs.duration) || 3;
        const travellers = parseInt(inputs.numTravelers) || 1;

        const prompt = `Create a travel itinerary for ${destination} for ${duration} days with ${travellers} traveler(s).

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

        // Call the Gemini API with structured JSON output
        const response = await geminiai.models.generateContent({
            model: 'gemini-3.6-flash',
            contents: prompt,
            config: {
                systemInstruction: 'You are an expert travel planner. Always return strict, valid JSON.',
                responseMimeType: 'application/json',
            },
        });

        // Parse response text into JavaScript object
        const tripData = JSON.parse(response.text);

        // Save trip to database linked to the authenticated user
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
        return res.status(500).json({ message: 'Failed to generate trip', error: error.message });
    }
};

export default {
    generateTrip,
};