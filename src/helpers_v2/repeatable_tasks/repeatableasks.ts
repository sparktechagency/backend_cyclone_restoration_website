import cron from 'node-cron';
import { deleteOldOtps } from './delete_otps/deleteOtps.helper';
import { deleteExpiredSubscription } from '../subscription/deleteExpiredSubscription.helper';

export const repetitiveTasks = () => {
  cron.schedule('*/15 * * * *', () => {
    deleteOldOtps();
    deleteExpiredSubscription();
  });
};
