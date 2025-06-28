import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../../shared/sendResponse';
import { userModel } from '../../model/user.model';
import { GenerateRandom6DigitNumber } from '../../../../../helpers/GenerateRandom5DigitNumber';
import { sendPasswordResetOtpViaEmail } from '../../../../../helpers/sendPasswordResetOtpViaEmail';

export const forgotPasswordController = myControllerHandler(
  async (req, res) => {
    const { email } = req.body;
    if (!email) {
      throw new Error('please provide email, invalid request');
    }
    const userData = await userModel.findOne({ email });
    if (!userData) {
      throw new Error('user does not exist with this email');
    }
    const otp: any = GenerateRandom6DigitNumber();
    userData.verificationOtp = otp;
    await userData.save();
    const refinedData = userData.toObject();
    delete refinedData.passwordHash;
    await sendPasswordResetOtpViaEmail(userData.name, userData.email, otp);

    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Review Given Successfully',
      data: {
        refinedData,
      },
    });
  }
);
