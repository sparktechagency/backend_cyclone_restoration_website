import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../../shared/sendResponse';
import { getTotalNumberOfTaskOfATeam } from '../../../../../helpers_v2/team/getTotalTaskOfATeam.helper';
import { getUserDataFromRequest2 } from '../../../../../helpers/getUserDataFromRequest.helper';
import { UserType } from '../../../auth_v2/model/user.model';
import { RestorationApplicationModel } from '../../../restoration_application/model/RestorationApplication.model';

export const getFirstLineOfTeamDashboardController = myControllerHandler(
  async (req, res) => {
    const teamData = (await getUserDataFromRequest2(req)) as UserType;
    if (teamData.role !== 'team') {
      throw new Error('invalid request. the user requesting is not team.');
    }
    const totalNumberOfTasks = await getTotalNumberOfTaskOfATeam(teamData.id);
    const totalNumberOfCompletedTask =
      await RestorationApplicationModel.countDocuments({
        assignedTeamId: teamData.id,
        status: 'completed',
      });

    const dataForClient = [
      { name: 'Total Task', number: totalNumberOfTasks },
      { name: 'Completed Task', number: totalNumberOfCompletedTask },
    ];

    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Fetched Successful',
      data: {
        data: dataForClient,
      },
    });
  }
);
