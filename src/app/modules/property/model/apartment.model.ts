import mongoose from 'mongoose';
import { ar7id } from '../../../../helpers/ar7Id';

const apartmentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => 'apartment_' + ar7id(),
    },
    propertyId: { type: String, required: true },
    floorNumber: {
      type: Number,
      required: true,
    },
    codeNumber: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      default: null,
    },
    images: {
      type: [String],
      required: true,
      default: [],
    },
    numberOfBedrooms: {
      type: Number,
      required: true,
      default: null,
    },
    numberOfBathrooms: {
      type: Number,
      required: true,
      default: null,
    },
    sizeInSquareFit: {
      type: Number,
      required: true,
      default: null,
    },
    numberOfKitchenRooms: {
      type: Number,
      required: true,
      default: null,
    },
    numberOfWashers: {
      type: Number,
      required: true,
      default: null,
    },
    isWifiAvailable: {
      type: Boolean,
      required: true,
      default: null,
    },
    isBalconyAvailable: {
      type: Boolean,
      required: true,
      default: null,
    },
    rentPerMonth: {
      type: Number,
      required: true,
      default: null,
    },
  },

  {
    timestamps: true,
  }
);

export const ApartmentModel = mongoose.model(
  'apartment_datas',
  apartmentSchema
);
