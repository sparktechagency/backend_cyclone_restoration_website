import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../../shared/sendResponse';
import { UserModel, userModel } from '../../model/user.model';
import { hashMyPassword } from '../../../../../helpers/passwordHashing';
import { GenerateRandom6DigitNumber } from '../../../../../helpers/GenerateRandom5DigitNumber';
import { sendOtpViaEmail } from '../../../../../helpers/sendOtp';

export const signUpController = myControllerHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    throw new Error('please enter name, email and password.');
  }
  let userData: any = await UserModel.findOne({ email: email });
  const verifiedAccountExistsWithThisEmail =
    userData && userData.isEmailVerified === true;
  if (verifiedAccountExistsWithThisEmail) {
    throw new Error('user already exists');
  }
  const unverifiedAccountExistWithThisEmail =
    userData && userData.isEmailVerified === false;
  const noAccountExists = !userData;

  const passwordHash = await hashMyPassword(password);
  const otp: any = GenerateRandom6DigitNumber();
  if (unverifiedAccountExistWithThisEmail) {
    userData.name = name;
    userData.email = email;
    userData.passwordHash = passwordHash;
    userData.verificationOtp = otp;
    userData.role = role;
    await userData.save();
  }
  if (noAccountExists) {
    userData = await UserModel.create({
      name: name,
      email: email,
      passwordHash: passwordHash,
      verificationOtp: otp,
      role: role,
    });
  }

  await sendOtpViaEmail(name, email, otp);
  const refinedUserData = await userData.toObject();
  delete refinedUserData.passwordHash;
  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Review Given Successfully',
    data: {
      userData: refinedUserData,
    },
  });
});
