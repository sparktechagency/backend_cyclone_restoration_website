import express from 'express';
import { createSubscriptionPackageController } from '../controller/createSubscriptionPackage.controller';
import { getSubscriptionPackagePaymentUrlController } from '../controller/getSubscriptionPackagePaymentUrl.controller';
import { getSubscriptionPackagesController } from '../controller/getSubscriptionPackages.controller';
import { subscriptionPaymentCompletionWebhookController } from '../controller/subscriptionCompletionWebhook.controller';
import { getPaymentSuccessPageController } from '../controller/getPaymentSuccessPage.controller';
import { getPaymentFailedPageController } from '../controller/getPaymentFailedPage.controller';

const router = express.Router();

router.post(
  '/create-subscription-package',
  createSubscriptionPackageController
);
router.get('/get-subscription-packages', getSubscriptionPackagesController);
router.get(
  '/get-subscription-package-payment-url',
  getSubscriptionPackagePaymentUrlController
);
router.get('/payment-success-page', getPaymentSuccessPageController);
router.get('/payment-failed-page', getPaymentFailedPageController);

export const subscriptionRouter = router;
