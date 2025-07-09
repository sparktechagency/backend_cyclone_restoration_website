import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { validateMissing } from '../../../../helpers_v2/validate-missing/validateMissing';
import { UserModel } from '../../auth_v2/model/user.model';
import sendResponse from '../../../../shared/sendResponse';

export const getTeamDetailsController = myControllerHandler(
  async (req, res) => {
    validateMissing([{ name: 'id', naturalName: 'Id' }], req.query);
    const { id } = req.query;

    const teamData = await UserModel.findOne({ id: id, role: 'team' });
    if (!teamData) {
      throw new Error('team does not exist with this id');
    }

    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Fetched Successful',
      data: {
        data: teamData,
      },
    });
  }
);
