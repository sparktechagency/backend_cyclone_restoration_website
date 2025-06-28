import { UserModel } from '../../../app/modules/auth_v2/model/user.model';

export const deleteOldOtps = async () => {
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
  const modifiedData = await UserModel.updateMany(
    {
      updatedAt: { $lt: tenMinutesAgo },
      verificationOtp: { $exists: true, $ne: null },
    },
    {
      $set: {
        verificationOtp: null,
      },
    }
  );
  if (modifiedData.modifiedCount > 0) {
    console.log(`${modifiedData.modifiedCount} old otps has been deleted`);
  }
};
