import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../../shared/sendResponse';
import { getUserDataFromRequest2 } from '../../../../../helpers/getUserDataFromRequest.helper';
import { UserType } from '../../../auth_v2/model/user.model';
import { checkIfUserIsTeam } from '../../../../../helpers_v2/team/checkIfUserIsTeam.helper';

export const getTaskOfATeamController = myControllerHandler(
  async (req, res) => {
    const userData = (await getUserDataFromRequest2(req)) as UserType;
    checkIfUserIsTeam(userData);
    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Fetched Successful',
      data: {},
    });
  }
);
