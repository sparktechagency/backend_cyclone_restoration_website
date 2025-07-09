import express from 'express';
import { setTotalNumberOfTeamMembersController } from '../controller/setTeamMemberNumber.controller';
import { getTeamMembersListController } from '../controller/getTeamMembersList.controller';
import { getTeamDetailsController } from '../controller/getTeamDetails.controller';
import { getFirstLineOfTeamDashboardController } from '../controller/dashboard/getFirstLineOfTeamDashboard.controller';
import { getTaskOfATeamController } from '../controller/task/getAssignedTask.controller';

const router = express.Router();

router.post(
  '/set-total-number-of-team-member',
  setTotalNumberOfTeamMembersController
);
router.get('/get-team-members-list', getTeamMembersListController);
router.get('/get-team-list', getTeamMembersListController);
router.get('/get-team-details', getTeamDetailsController);
router.get(
  '/get-first-line-of-team-dashboard',
  getFirstLineOfTeamDashboardController
);

router.get('/get-tasks-of-a-team', getTaskOfATeamController);

export const teamRouter = router;
