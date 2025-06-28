import express from 'express';

import { completeProfile1Controller } from '../controller/version_1/completeProfile1.controller';
import { completeProfile2Controller } from '../controller/version_1/completeProfile2.controller';
import { addVaultPasswordController } from '../controller/version_1/addVaultPassword.controller';
import { changePasswordController } from '../controller/version_1/changePassword.controller';
import { vaultSignInController } from '../controller/version_1/vaultSignIn.controller';
import { updateVaultPasswordController } from '../controller/version_1/updateVaultPassword.controller';
import { changePasswordInSettingsController } from '../controller/version_1/changePasswordInSettings.controller';
import { fingerPrintVerificationController } from '../../vault/controller/fingerprintVerification.controller';
import { updateSingleAuthCardController } from '../controller/version_1/updateSingleAuthCard.controller';
import { forgotVaultPasswordController } from '../controller/version_1/forgotVaultPassword.controller';
import { secondPhaseOfForgotVaultPasswordController } from '../controller/version_1/secondPhaseOfForgotVaultPassword.controller';
import { signInWithGoogleController } from '../controller/version_1/googleSignIn.controller';
import { signInWithMicrosoftController } from '../controller/version_1/signInWithMicrosoft.controller';
import { signUpOrInWithGoogleController } from '../controller/version_1/signUpOrInWithGoogle.controller';
import { signUpOrInWithMicrosoftController } from '../controller/version_1/signInOrUpWithMicrosoft.controller';
import { signIn2Controller } from '../controller/version_1/signIn2.controller';
import { verifyOtpOfForgotPasswordController2 } from '../controller/version_1/verifyOtpOfForgotPassword2.controller';
import { updateProfileController2 } from '../controller/version_1/updateProfile2.controller';
import { changePasswordInSettingsController2 } from '../controller/version_1/changePasswordInSettings2.controller';
import { signUpController } from '../controller/version_2/signUp.controller';
import { verifyAccountWithOtpController } from '../controller/version_2/verifyAccountWithOtp.controller';
import { forgotPasswordController } from '../controller/version_2/forgotPassword.controller';
import { checkIfOtpIsCorrectController } from '../controller/version_2/checkIfOtpIsCorrect.controller';
import { changePasswordOfForgotPasswordController } from '../controller/version_2/changePasswordOfForgotPassword.controller';
import { loginController } from '../controller/version_2/login.controller';

const authV2Router = express.Router();

authV2Router.post('/sign-up', signUpController);
authV2Router.post('/verify-account-with-otp', verifyAccountWithOtpController);
authV2Router.post('/log-in', loginController);
authV2Router.post('/complete-profile-1', completeProfile1Controller);
authV2Router.post('/complete-profile-2', completeProfile2Controller);
authV2Router.post('/update-single-auth-card', updateSingleAuthCardController);
authV2Router.post('/add-vault-password', addVaultPasswordController);
authV2Router.post('/forgot-password', forgotPasswordController);
authV2Router.post('/forgot-vault-password', forgotVaultPasswordController);
authV2Router.post(
  '/second-phase-of-forgot-vault-password',
  secondPhaseOfForgotVaultPasswordController
);

authV2Router.post(
  '/verify-forgot-password-otp',
  verifyOtpOfForgotPasswordController2
);
authV2Router.post('/check-if-otp-is-correct', checkIfOtpIsCorrectController);
authV2Router.post('/reset-password', changePasswordController);
authV2Router.post(
  '/change-password-of-forgot-password',
  changePasswordOfForgotPasswordController
);
authV2Router.post('/change-password', changePasswordInSettingsController);

authV2Router.post(
  '/change-password-in-settings',
  changePasswordInSettingsController2
);

authV2Router.post('/vault/sign-in', vaultSignInController);
authV2Router.post(
  '/vault/fingerprint-verification',
  fingerPrintVerificationController
);
authV2Router.post('/update-profile', updateProfileController2);
authV2Router.post('/update-vault-password', updateVaultPasswordController);
authV2Router.post('/sign-in-with-google', signInWithGoogleController);
authV2Router.post('/sign-in-with-microsoft', signInWithMicrosoftController);
authV2Router.post('/sign-up-or-in-with-google', signUpOrInWithGoogleController);
authV2Router.post(
  '/sign-up-or-in-with-microsoft',
  signUpOrInWithMicrosoftController
);
export { authV2Router };
