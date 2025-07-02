import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { myStripe } from '../../../../config/stripe/stripe.config';
import {
  FRONTEND_ADDRESS,
  PAYMENT_FAILED_URL,
  PAYMENT_SUCCESS_URL,
} from '../../../../data/environmentVariables';
import { SubscriptionPackageModel } from '../model/subscriptionPackage.model';
import { validateMissing } from '../../../../helpers_v2/validate-missing/validateMissing';
import sendResponse from '../../../../shared/sendResponse';
import { getUserDataFromRequest2 } from '../../../../helpers/getUserDataFromRequest.helper';

export const getSubscriptionPackagePaymentUrlController = myControllerHandler(
  async (req, res) => {
    const userData = await getUserDataFromRequest2(req);

    validateMissing(
      [{ name: 'subscription_id', naturalName: 'Subscription Id' }],
      req.query
    );
    const { subscription_id } = req.query;
    const subscriptionData = await SubscriptionPackageModel.findOne({
      id: subscription_id,
    });

    if (!subscriptionData) {
      throw new Error('subscription does not exist with this id.');
    }
    const itemsData = req.body;
    const refinedPaymentData = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: subscriptionData.name,
            metadata: {
              subscription_id: subscriptionData.id, // your internal ID
              user_id: userData.id,
            },
          },
          unit_amount: subscriptionData.price * 100,
        },
        quantity: 1,
      },
    ];

    // for (let i = 0; i < itemsData.length; i++) {
    //   const singleData = itemsData[i];
    //   const productData: any = await productModel.findOne({
    //     id: singleData.id,
    //   });
    //   const { price, title } = productData;
    //   const singleRefinedData = {
    //     price_data: {
    //       currency: 'usd',
    //       product_data: {
    //         name: title,
    //         metadata: {
    //           product_id: singleData.id, // your internal ID
    //         },
    //       },
    //       unit_amount: price * 100,
    //     },
    //     quantity: singleData.quantity,
    //   };
    //   refinedPaymentData.push(singleRefinedData);
    // }

    const session = await myStripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${PAYMENT_SUCCESS_URL}`,
      cancel_url: `${PAYMENT_FAILED_URL}`,
      line_items: refinedPaymentData,
    });
    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Fetched Successful',
      data: {
        paymentUrl: session.url,
      },
    });
  }
);
