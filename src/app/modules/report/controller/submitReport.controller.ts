import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { getUserDataFromRequest2 } from '../../../../helpers/getUserDataFromRequest.helper';
import { ReportModel } from '../model/Report.model';

export const submitReportController = myControllerHandler(async (req, res) => {
  const userData = await getUserDataFromRequest2(req);
  const { subject, message } = req.body;
  const reportData = await ReportModel.create({
    userId: userData.id,
    subject: subject,
    message: message,
  });

  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Report Submitted Successful',
    data: {
      data: reportData,
    },
  });
});
