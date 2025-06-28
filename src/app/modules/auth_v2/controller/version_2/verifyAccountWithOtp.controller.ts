import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../../shared/sendResponse';
import { UserModel } from '../../model/user.model';

export const verifyAccountWithOtpController = myControllerHandler(
  async (req, res) => {
    let { otp } = req.body;
    otp = Number(otp);
    const userData = await UserModel.findOne({ verificationOtp: otp });
    if (!userData) {
      throw new Error('the otp is invalid');
    }
    userData.isEmailVerified = true;
    userData.verificationOtp = null;
    await userData.save();
    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Account Verified Successfully',
      data: { userData },
    });
  }
);
