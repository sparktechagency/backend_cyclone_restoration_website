import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { deleteExpiredSubscription } from '../../../../helpers_v2/subscription/deleteExpiredSubscription.helper';

export const testDummyController = myControllerHandler(async (req, res) => {
  deleteExpiredSubscription();
  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Fetched Successful',
    data: {},
  });
});
