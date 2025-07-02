import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../../shared/sendResponse';
import { getUserDataFromRequest2 } from '../../../../../helpers/getUserDataFromRequest.helper';
import { getDataFromFormOfRequest } from '../../../../../helpers/getDataFromFormAR7';
import { saveAndGiveRefinedUrl } from '../../../../../helpers/saveAndGiveRefinedLink';

export const uploadHouseInsuranceDetailsController = myControllerHandler(
  async (req, res) => {
    const userData = await getUserDataFromRequest2(req);
    const formData = await getDataFromFormOfRequest(req);
    const { insurance_provider_name, policy_number } = formData.fields;
    const { insurance_doc_photo } = formData.files;

    if (insurance_provider_name) {
      userData.houseInsuranceProviderName = insurance_provider_name[0];
    }
    if (policy_number) {
      userData.houseInsurancePolicyNumber = policy_number[0];
    }

    if (insurance_doc_photo) {
      const url = await saveAndGiveRefinedUrl(
        insurance_doc_photo[0],
        './public/images/house-insurance'
      );
      userData.houseInsuranceDocUrl = url;
    }

    await userData.save();

    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Fetched Successful',
      data: { data: userData },
    });
  }
);
