import mongoose from 'mongoose';
import { ar7id } from '../../../../helpers/ar7Id';

const packageSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => 'subscription_package_' + ar7id(),
    },
    name: { type: String, required: true, unique: true },
    planId: {
      type: String,
      required: true,
      enum: ['free', 'basic', 'premium', 'pro'],
      lowercase: true,
      trim: true,
    },

    price: { type: Number, required: true },

    durationInMonths: {
      type: Number,
      required: true,
      min: 1,
    },

    features: {
      type: [String],
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

export const SubscriptionPackageModel = mongoose.model(
  'subscription_packages_2',
  packageSchema
);
