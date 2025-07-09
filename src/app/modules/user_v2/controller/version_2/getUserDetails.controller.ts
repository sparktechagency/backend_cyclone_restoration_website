import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../../shared/sendResponse';
import { validateMissing } from '../../../../../helpers_v2/validate-missing/validateMissing';
import { UserModel } from '../../../auth_v2/model/user.model';

export const getUserDetailsController = myControllerHandler(
  async (req, res) => {
    validateMissing([{ name: 'id', naturalName: 'Id' }], req.query);
    const { id } = req.query;

    const userData = await UserModel.findOne({ id: id });
    if (!userData) {
      throw new Error('user data does not exist with this id');
    }

    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Fetched Successful',
      data: {},
    });
  }
);
