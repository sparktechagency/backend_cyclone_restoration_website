import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { SubscriptionPackageModel } from '../model/subscriptionPackage.model';

export const getSubscriptionPackagesController = myControllerHandler(
  async (req, res) => {
    const data = await SubscriptionPackageModel.find({});
    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Fetched Successful',
      data: { packagesData: data },
    });
  }
);
