import mongoose from 'mongoose';
import { ar7id } from '../../../../helpers/ar7Id';

const mySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => 'message_' + ar7id(),
    },
    message: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    receiverId: {
      type: String,
      required: true,
    },
    conversationId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const MessagesModel = mongoose.model('messages_databases', mySchema);
