import mongoose from 'mongoose';
import OpenAi from 'openai';
import { v4 as uuidv4 } from 'uuid';
import Trip from '../models/Trip.js';


const openai = new OpenAi({ apiKey: process.env.OPENAI_API_KEY });

const generateTrip = async (req, res) => {
    const { destination, inputs = {} } = req.body;

    const duration = parseInt(inputs.duration) || 3;
    const travellers = parseInt(inputs.numTravelers) || 1;
};

export default {
    generateTrip,
};