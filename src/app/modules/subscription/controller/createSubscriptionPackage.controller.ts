import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { checkIfUserRequestingAdmin3 } from '../../../../helpers/checkIfRequestedUserAdmin';
import { validateMissing } from '../../../../helpers_v2/validate-missing/validateMissing';
import { SubscriptionPackageModel } from '../model/subscriptionPackage.model';

export const createSubscriptionPackageController = myControllerHandler(
  async (req, res) => {
    await checkIfUserRequestingAdmin3(req);
    validateMissing(
      [
        { name: 'name', naturalName: 'Name' },
        { name: 'price', naturalName: 'Price' },
        { name: 'durationInMonths', naturalName: 'Duration in Months' },
        { name: 'planId', naturalName: 'Plan ID' },
        { name: 'features', naturalName: 'Features' },
      ],
      req.body
    );

    const { name, price, durationInMonths, planId, features } = req.body;
    const subscriptionData = await SubscriptionPackageModel.create({
      name: name,
      price: price,
      durationInMonths: durationInMonths,
      planId: planId,
      features: features,
    });

    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Fetched Successful',
      data: {
        data: subscriptionData,
      },
    });
  }
);
