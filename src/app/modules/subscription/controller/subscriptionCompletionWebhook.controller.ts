import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { myStripe } from '../../../../config/stripe/stripe.config';
import { STRIPE_SIGNING_SECRET } from '../../../../data/environmentVariables';
import { PaymentModelV3 } from '../../payment_v2/model/PaymentVersion3.model';
import { validateMissing } from '../../../../helpers_v2/validate-missing/validateMissing';
import { UserModel, userModel } from '../../auth_v2/model/user.model';
import { SubscriptionPackageModel } from '../model/subscriptionPackage.model';

export const subscriptionPaymentCompletionWebhookController =
  myControllerHandler(async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const testEvent: any = myStripe.webhooks.constructEvent(
      req.body,
      sig!,
      STRIPE_SIGNING_SECRET
    );
    const checkoutSessionId = testEvent.data.object.id;
    const purchasedItems: any = await myStripe.checkout.sessions.listLineItems(
      checkoutSessionId,
      { expand: ['data.price.product'] }
    );
    // for (let i = 0; i < purchasedItems.data.length; i++) {
    //   const singleData: any = purchasedItems.data[i];
    //   // console.log(singleData.price?.product?.metadata);
    // }
    const myData = purchasedItems.data[0].price?.product?.metadata;
    const { subscription_id, user_id } = myData;
    const userData = await UserModel.findOne({ id: user_id });
    const subscriptionData = await SubscriptionPackageModel.findOne({
      id: subscription_id,
    });
    if (!userData) {
      throw new Error('user does not exist with this user id');
    }
    if (!subscriptionData) {
      throw new Error('subscription does not exist with this subscription id');
    }
    const session = await myStripe.checkout.sessions.retrieve(
      checkoutSessionId
    );
    const totalAmount = session.amount_total; // Amount in the smallest currency unit (e.g., cents)
    const currency = session.currency;
    const paymentStatus = session.payment_status;
    const paymentDate = session.created;
    const paymentIntentId = session.payment_intent;

    const paymentDataAfterSaving = await PaymentModelV3.create({
      userId: user_id,
      subscriptionId: subscription_id,
      paymentFor: 'subscription',
      checkoutSessionId: checkoutSessionId,
      paymentIntentId: paymentIntentId,
      currency: currency,
      status: paymentStatus,
      totalAmount: totalAmount,
      unit: 'cent',
    });
    userData.currentSubscriptionId = subscriptionData.id;
    await userData.save();

    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Fetched Successful',
      data: {
        data: paymentDataAfterSaving,
      },
    });
  });
