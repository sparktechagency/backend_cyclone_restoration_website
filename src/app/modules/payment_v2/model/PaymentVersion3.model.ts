import mongoose from 'mongoose';
import { ar7id } from '../../../../helpers/ar7Id';

const paymentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => 'payment_v3_' + ar7id(),
    },
    userId: {
      type: String,
      required: true,
    },
    paymentFor: {
      type: String,
      enum: ['subscription', 'product', 'service'],
    },
    subscriptionId: {
      type: String,
      required: false,
    },
    checkoutSessionId: {
      type: String,
      required: false,
    },
    paymentIntentId: {
      type: String,
      required: false,
    },
    currency: { type: String, required: false },
    unit: { type: String, required: false },
    status: {
      type: String,
      required: false,
    },
    totalAmount: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const PaymentModelV3 = mongoose.model(
  'payment_version_3',
  paymentSchema
);
