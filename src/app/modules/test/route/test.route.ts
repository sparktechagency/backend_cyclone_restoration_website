import express from 'express';
import { testController } from '../controller/test.controller';
import { makeDummyUserController } from '../controller/generateDummyUser.controller';
import { step1StripePaymentSaveController } from '../controller/stripePaymentSave.controller';
import { step2StripePaymentSaveController } from '../controller/saveStripeCard.controller';
import { testSavedCardPaymentController } from '../controller/testSavedCardPayment.controller';
import { deleteOldOtps } from '../../../../helpers_v2/repeatable_tasks/delete_otps/deleteOtps.helper';
import { deleteOldOtpsController } from '../controller/deleteOldOtps.controller';

const testRouter = express.Router();

testRouter.post('/', testController);
testRouter.get('/create-dummy-user', makeDummyUserController);
testRouter.post(
  '/stripe-payment-method-save',
  step1StripePaymentSaveController
);
testRouter.post('/step-1-save-stripe-card', step1StripePaymentSaveController);
testRouter.post('/step-2-save-stripe-card', step2StripePaymentSaveController);
testRouter.post('/test-saved-card-payment', testSavedCardPaymentController);
testRouter.post('/delete-old-otps', deleteOldOtpsController);
export { testRouter };
