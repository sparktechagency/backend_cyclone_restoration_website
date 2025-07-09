import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../../shared/sendResponse';
import { validateMissing } from '../../../../../helpers_v2/validate-missing/validateMissing';
import { UserModel } from '../../model/user.model';

export const getUserDetailsWithIdController = myControllerHandler(
  async (req, res) => {
    validateMissing([{ name: 'user_id', naturalName: 'User Id' }], req.query);

    const { user_id } = req.query;
    const userData = await UserModel.findOne({ id: user_id });

    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Fetched Successful',
      data: { data: userData },
    });
  }
);
