import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../../shared/sendResponse';
import { UserModel } from '../../model/user.model';
import { hashMyPassword } from '../../../../../helpers/passwordHashing';

export const changePasswordOfForgotPasswordController = myControllerHandler(
  async (req, res) => {
    const { otp, new_password } = req.body;
    if (!otp) {
      throw new Error('please provide otp');
    }
    if (!new_password) {
      throw new Error('please provide new password');
    }

    const userData = await UserModel.findOne({
      verificationOtp: otp,
    });
    if (!userData) {
      throw new Error('this otp is not valid');
    }

    const passwordHash: any = await hashMyPassword(new_password);
    userData.passwordHash = passwordHash;
    userData.verificationOtp = null;
    await userData.save();

    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'password updated successfully',
      data: {},
    });
  }
);
