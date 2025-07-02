import express from 'express';
import { subscriptionPaymentCompletionWebhookController } from '../../subscription/controller/subscriptionCompletionWebhook.controller';

const router = express.Router();

router.post(
  '/stripe-subscription-completion-webhook',
  subscriptionPaymentCompletionWebhookController
);

export const withoutJsonAndUrlEncodedRouter = router;
