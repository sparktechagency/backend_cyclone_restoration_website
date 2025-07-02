import express from 'express';
import { createRestorationApplicationController } from '../controller/createRestorationApplication.controller';

const router = express.Router();

router.post(
  '/send-restoration-application',
  createRestorationApplicationController
);

export const restorationApplicationRouter = router;
