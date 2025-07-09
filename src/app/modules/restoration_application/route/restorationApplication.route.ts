import express from 'express';
import { createRestorationApplicationController } from '../controller/createRestorationApplication.controller';
import { getRestorationRequestController } from '../controller/getRestorationRequests.controller';
import { assignTeamToRestorationController } from '../controller/assignTeamToRestoration.controller';

const router = express.Router();

router.post(
  '/send-restoration-application',
  createRestorationApplicationController
);
router.get('/get-restoration-request', getRestorationRequestController);
router.post('/assign-team-to-restoration', assignTeamToRestorationController);

export const restorationApplicationRouter = router;
