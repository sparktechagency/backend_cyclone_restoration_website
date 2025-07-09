import mongoose from 'mongoose';
import { ar7id } from '../../../../helpers/ar7Id';

const mySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => 'conversation_' + ar7id(),
    },
    involvedPeoplesId: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ConversationModel = mongoose.model(
  'conversation_databases',
  mySchema
);
