import mongoose from 'mongoose';
import { ar7id } from '../../../../helpers/ar7Id';

const propertySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => 'property_' + ar7id(),
    },
    ownerId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    addressLine1: {
      type: String,
      required: true,
    },
    addressLine2: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    numberOfFloors: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      required: true,
      default: [],
    },
    units: {
      type: [String],
      required: true,
      default: [],
    },

    appartments: {
      type: [String],
      required: true,
      default: [],
    },
    isParkingAvailable: {
      type: Boolean,
      required: true,
      default: false,
    },
    isGardenAvailable: {
      type: Boolean,
      required: true,
      default: false,
    },
    isLiftAvailable: {
      type: Boolean,
      required: true,
      default: false,
    },
    formSubmissionFee: {
      type: Number,
      required: true,
      default: 0,
    },
    isIncomeTaxDocCompulsary: {
      type: Boolean,
      required: true,
      default: false,
    },
    isIdCardCompulsary: {
      type: Boolean,
      required: true,
      default: false,
    },
    isCreditApplicationDocCompulsary: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const PropertyModel = mongoose.model('property_datas', propertySchema);
