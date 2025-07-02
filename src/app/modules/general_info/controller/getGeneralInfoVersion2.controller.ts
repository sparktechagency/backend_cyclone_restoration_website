import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { GeneralInfoModel } from '../model/generalInfo.model';

export const getGeneralInfoControllerV2 = myControllerHandler(
  async (req, res) => {
    const data = await GeneralInfoModel.findOne();
    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Fetched Successful',
      data: { data },
    });
  }
);
