import mongoose from 'mongoose';
import { ar7id } from '../../helpers/ar7Id';

const mySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => 'my_id_' + ar7id(),
    },
  },
  {
    timestamps: true,
  }
);

export const MyModel = mongoose.model('my_database_name', mySchema);
