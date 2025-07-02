import mongoose from 'mongoose';
import { ar7id } from '../../../../helpers/ar7Id';

const mySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => 'report_' + ar7id(),
    },
    userId: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const ReportModel = mongoose.model('report_of_users_', mySchema);
