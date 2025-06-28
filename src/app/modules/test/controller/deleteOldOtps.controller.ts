import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { deleteOldOtps } from '../../../../helpers_v2/repeatable_tasks/delete_otps/deleteOtps.helper';

export const deleteOldOtpsController = myControllerHandler(async (req, res) => {
  const myData = req.body;
  deleteOldOtps();
  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Review Given Successfully',
    data: {},
  });
});
