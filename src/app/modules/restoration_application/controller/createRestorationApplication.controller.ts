import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { getUserDataFromRequest2 } from '../../../../helpers/getUserDataFromRequest.helper';
import { getDataFromFormOfRequest } from '../../../../helpers/getDataFromFormAR7';
import { RestorationApplicationModel } from '../model/RestorationApplication.model';
import { saveMultipleFileAndGiveLink } from '../../../../helpers_v2/files/saveAndGiveMultipleFileLink';

export const createRestorationApplicationController = myControllerHandler(
  async (req, res) => {
    const userData = await getUserDataFromRequest2(req);
    const dataOfForm = await getDataFromFormOfRequest(req);
    const {
      title,
      date_of_damage,
      contact_person_name,
      phone_number,
      location,
      description,
      damage_severity_level,
    } = dataOfForm.fields;
    const { images_of_damaged_house } = dataOfForm.files;
    const applicationData = await RestorationApplicationModel.create({
      userId: userData.id,
    });
    if (title) {
      applicationData.title = title[0];
    }
    if (date_of_damage) {
      applicationData.dateOfDamage = date_of_damage[0];
    }
    if (contact_person_name) {
      applicationData.contactPersonName = contact_person_name[0];
    }
    if (phone_number) {
      applicationData.phoneNumber = phone_number[0];
    }

    if (damage_severity_level) {
      applicationData.damageSeverityLevel = damage_severity_level[0];
    }
    if (location) {
      applicationData.location = location[0];
    }
    if (description) {
      applicationData.description = description[0];
    }

    if (images_of_damaged_house) {
      const arrayOfSavedImages = await saveMultipleFileAndGiveLink(
        images_of_damaged_house,
        './public/images/damaged-houses'
      );
      applicationData.imagesOfDamagedHouse = arrayOfSavedImages;
    }

    await applicationData.save();

    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Fetched Successful',
      data: {
        data: applicationData,
      },
    });
  }
);
