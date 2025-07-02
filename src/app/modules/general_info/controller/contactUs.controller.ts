import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { validate } from 'node-cron';
import { validateMissing } from '../../../../helpers_v2/validate-missing/validateMissing';
import { sendContactUsEmail } from '../../../../helpers_v2/email/contactUsEmail.helper';
import {
  GeneralInfoModel,
  generalInfoModelOfMantled,
} from '../model/generalInfo.model';

export const contactUsController = myControllerHandler(async (req, res) => {
  validateMissing(
    [
      { name: 'name', naturalName: 'Name' },
      { name: 'email', naturalName: 'Email' },
      { name: 'phone', naturalName: 'Phone Number' },
      { name: 'message', naturalName: 'User Message' },
    ],
    req.body
  );
  const { name, email, phone, message } = req.body;
  const generalInfo = await GeneralInfoModel.findOne();
  if (!generalInfo?.company_email_address) {
    throw new Error('company email address is not provided yet');
  }
  await sendContactUsEmail(
    name,
    email,
    phone,
    message,
    generalInfo.company_email_address
  );
  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Message Sent Successful.',
    data: {},
  });
});
