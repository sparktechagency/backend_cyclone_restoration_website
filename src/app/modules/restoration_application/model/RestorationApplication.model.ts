import mongoose from 'mongoose';
import { ar7id } from '../../../../helpers/ar7Id';

const mySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => 'restoration_application_' + ar7id(),
    },
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: null,
    },
    dateOfDamage: {
      type: Date,
      required: false,
      default: null,
    },
    contactPersonName: {
      type: String,
      required: false,
      default: null,
    },
    phoneNumber: {
      type: String,
      required: false,
      default: null,
    },
    damageSeverityLevel: {
      type: Number,
      required: false,
      default: null,
    },
    location: {
      type: String,
      required: false,
      default: null,
    },
    description: {
      type: String,
      required: false,
      default: null,
    },
    imagesOfDamagedHouse: {
      type: [String],
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const RestorationApplicationModel = mongoose.model(
  'restoration_applications',
  mySchema
);
