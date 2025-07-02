import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../../shared/sendResponse';
import { UserModel } from '../../model/user.model';
import { jwt } from '../../../../../utils/others/ForUnsupportedImportSuggestion';
import { JWT_SECRET_KEY } from '../../../../../data/environmentVariables';
import { checkMyPassword } from '../../../../../helpers/passwordHashing';
import { validateMissing } from '../../../../../helpers_v2/validate-missing/validateMissing';

export const loginController = myControllerHandler(async (req, res) => {
  const { email, password } = req.body;
  validateMissing(
    [
      { name: 'email', naturalName: 'Email' },
      { name: 'password', naturalName: 'Password' },
    ],
    req.body
  );

  const userData = await UserModel.findOne({ email: email });
  if (!userData) {
    throw new Error('user does not exist with this email');
  }
  if (!userData.passwordHash) {
    throw new Error('sign in with google required');
  }
  if (userData.isEmailVerified === false) {
    throw new Error(
      'this account is not verified. please verify your account first or sign up again'
    );
  }
  const passwordHash: any = userData.passwordHash;
  await checkMyPassword(password, passwordHash);

  const tokenData = { userId: userData.id };
  let authToken = jwt.sign(tokenData, JWT_SECRET_KEY);
  authToken = `Bearer ${authToken}`;

  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Signed in successful',
    data: {
      authToken: authToken,
    },
  });
});
