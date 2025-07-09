import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { getUserDataFromRequest2 } from '../../../../helpers/getUserDataFromRequest.helper';
import { UserType } from '../../auth_v2/model/user.model';
import { validateMissing } from '../../../../helpers_v2/validate-missing/validateMissing';

export const setTotalNumberOfTeamMembersController = myControllerHandler(
  async (req, res) => {
    validateMissing(
      [{ name: 'number_of_member', naturalName: 'Total number of members' }],
      req.body
    );
    const userData: UserType = await getUserDataFromRequest2(req);

    if (userData.role !== 'team') {
      throw new Error('The user requesting is not team, invalid request');
    }
    const { number_of_member } = req.body;
    userData.totalNumberOfTeamMembers = number_of_member;
    await userData.save();

    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Fetched Successful',
      data: {
        userData,
      },
    });
  }
);
