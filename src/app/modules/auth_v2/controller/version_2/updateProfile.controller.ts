import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../../shared/sendResponse';
import { getUserDataFromRequest2 } from '../../../../../helpers/getUserDataFromRequest.helper';
import { getDataFromFormOfRequest } from '../../../../../helpers/getDataFromFormAR7';
import { saveAndGiveRefinedUrl } from '../../../../../helpers/saveAndGiveRefinedLink';

export const updateProfileController = myControllerHandler(async (req, res) => {
  const userData = await getUserDataFromRequest2(req);
  const formData = await getDataFromFormOfRequest(req);

  const { name, email, gender, phone_number } = formData.fields;
  const { profile_picture } = formData.files;
  if (name) {
    userData.name = name[0];
  }
  if (email) {
    userData.email = email[0];
  }
  if (gender) {
    userData.gender = gender[0];
  }
  if (phone_number) {
    userData.phone_number = phone_number[0];
  }
  if (profile_picture) {
    const url = await saveAndGiveRefinedUrl(
      profile_picture[0],
      './public/images/users/profile-pictures'
    );
    userData.profilePictureUrl = url;
  }

  await userData.save();

  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Fetched Successful',
    data: { userData },
  });
});
