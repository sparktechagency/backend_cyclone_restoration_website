import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../../shared/sendResponse';
import { UserModel, userModel } from '../../model/user.model';
import { hashMyPassword } from '../../../../../helpers/passwordHashing';
import { GenerateRandom6DigitNumber } from '../../../../../helpers/GenerateRandom5DigitNumber';
import { sendOtpViaEmail } from '../../../../../helpers/sendOtp';
import { validateMissing } from '../../../../../helpers_v2/validate-missing/validateMissing';

export const signUpController = myControllerHandler(async (req, res) => {
  validateMissing(
    [
      { name: 'name', naturalName: 'User Name' },
      { name: 'email', naturalName: 'Email' },
      { name: 'password', naturalName: 'Password' },
      { name: 'role', naturalName: 'Role' },
      { name: 'address', naturalName: 'Address' },
      { name: 'phone', naturalName: 'Phone Number' },
    ],
    req.body
  );
  const { name, email, password, role, address } = req.body;
  let userData: any = await UserModel.findOne({ email: email });
  const verifiedAccountExistsWithThisEmail =
    userData && userData.isEmailVerified === true;
  if (verifiedAccountExistsWithThisEmail) {
    throw new Error('user already exists with this email');
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
    userData.address = address;
    await userData.save();
  }
  if (noAccountExists) {
    userData = await UserModel.create({
      name: name,
      email: email,
      passwordHash: passwordHash,
      verificationOtp: otp,
      role: role,
      address: address,
    });
  }

  await sendOtpViaEmail(name, email, otp);
  const refinedUserData = await userData.toObject();
  delete refinedUserData.passwordHash;
  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Otp sent to your email successfully',
    data: {
      userData: refinedUserData,
    },
  });
});
