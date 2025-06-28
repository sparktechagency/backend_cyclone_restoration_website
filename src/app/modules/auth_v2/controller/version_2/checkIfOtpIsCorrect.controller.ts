import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../../shared/sendResponse';
import { userModel } from '../../model/user.model';

export const checkIfOtpIsCorrectController = myControllerHandler(
  async (req, res) => {
    const { otp } = req.body;
    const userData = await userModel.findOne({ verificationOtp: otp });
    if (!userData) {
      throw new Error('this otp is not valid');
    }
    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'this otp is valid',
      data: {},
    });
  }
);
