import mongoose, { HydratedDocument, InferSchemaType } from 'mongoose';
import { ar7id } from '../../../../helpers/ar7Id';
import { number } from 'joi';

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => 'user_' + ar7id(),
    },
    name: {
      type: String,
      required: true,
    },
    email: { type: String, required: true, unique: true },
    isEmailVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    passwordHash: { type: String, required: false },
    address: { type: String, required: false },
    verificationOtp: { type: Number, required: false },
    role: {
      type: String,
      enum: ['user', 'team', 'admin'],
      required: true,
      default: 'user',
    },
    isBanned: {
      type: Boolean,
      default: false,
      required: true,
    },

    profilePictureUrl: {
      type: String,
      required: false,
      default: null,
    },
    stripeCustomerId: {
      type: String,
      required: false,
    },
    stripePaymentMethodId: {
      type: String,
      required: false,
    },
    nameOfTheBank: {
      type: String,
      required: false,
    },
    accountNumberOfTheBank: {
      type: String,
      required: false,
    },
    branchCodeOfBank: {
      type: String,
      required: false,
    },
    currentSubscriptionId: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    houseInsuranceProviderName: {
      type: String,
      required: false,
    },
    houseInsurancePolicyNumber: {
      type: String,
      required: false,
    },
    houseInsuranceDocUrl: {
      type: String,
      required: false,
    },
    totalNumberOfTeamMembers: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const userModel = mongoose.model('users', userSchema);
export const UserModel = userModel;

type User = InferSchemaType<typeof UserModel.schema>;

// 2. Get the hydrated document type (includes _id, instance methods, etc.)
export type UserType = HydratedDocument<User>;
