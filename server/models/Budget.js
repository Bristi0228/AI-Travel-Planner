import mongoose, { Schema, model } from 'mongoose';

const budgetSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    destination: {
      type: String,
      required: [true, 'Destination is required'],
      trim: true,
    },
    destinationImage: {
      type: String,
      default: '',
    },
    currency: {
      type: String,
      uppercase: true,
      default: 'INR',
    },
    inputs: {
      duration: { type: Number, required: true, min: 1 },
      numTravelers: { type: Number, default: 1, min: 1 },
      accommodationType: { type: String, lowercase: true, trim: true },
      travelSession: { type: String, lowercase: true, trim: true },
      dailyFoodPreference: { type: String, lowercase: true, trim: true },
      userCurrency: { type: String, default: 'INR', uppercase: true },
    },
    breakdown: {
      accommodation: { type: Number, default: 0 },
      food: { type: Number, default: 0 },
      flights: { type: Number, default: 0 },
      transport: { type: Number, default: 0 },
      insurance: { type: Number, default: 0 },
      miscellaneous: { type: Number, default: 0 },
      emergencyBuffer: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
      perPerson: { type: Number, default: 0 },
    },
    aiInsights: {
      verdict: String,
      moneySavingTips: [String],
      hiddenCosts: [String],
      localPriceExample: Schema.Types.Mixed,
    },
    status: {
      type: String,
      enum: ['active', 'archived'],
      default: 'active',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Budget = mongoose.models.Budget || model('Budget', budgetSchema);

export default Budget;