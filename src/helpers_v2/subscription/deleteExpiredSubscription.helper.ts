import { UserModel } from '../../app/modules/auth_v2/model/user.model';
import { PaymentModelV3 } from '../../app/modules/payment_v2/model/PaymentVersion3.model';
import { SubscriptionPackageModel } from '../../app/modules/subscription/model/subscriptionPackage.model';
import { subscriptionPackageModel } from '../../app/modules/subscription_packages/model/subscriptionPackages.model';
import { redColor } from '../../utils/others/colors.utils';

export const deleteExpiredSubscription = async () => {
  try {
    const subscribedPeople = await UserModel.find({
      currentSubscriptionId: { $exists: true, $ne: null },
    });
    for (let i = 0; i < subscribedPeople.length; i++) {
      const singleSubscribedPeople = subscribedPeople[i];
      const subscriptionData: any = await SubscriptionPackageModel.findOne({
        id: singleSubscribedPeople.currentSubscriptionId,
      });
      const purchaseData: any = await PaymentModelV3.findOne({
        subscriptionId: subscriptionData?.id,
        userId: singleSubscribedPeople.id,
      });

      const durationInMonths = subscriptionData?.durationInMonths;
      const creationDate = new Date(purchaseData?.createdAt);

      // Get the current date
      const currentDate = new Date();

      // Calculate the difference in months
      const monthsDifference =
        (currentDate.getFullYear() - creationDate.getFullYear()) * 12 +
        (currentDate.getMonth() - creationDate.getMonth());

      const isSubscriptionActive = !(monthsDifference >= durationInMonths);
      if (!isSubscriptionActive) {
        singleSubscribedPeople.currentSubscriptionId = null;
        await singleSubscribedPeople.save();
        console.log(
          redColor,
          `Subscription of ${singleSubscribedPeople.name} has expired`
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};
