import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { GeneralInfoModel } from '../model/generalInfo.model';

export const editGeneralInfoController = myControllerHandler(
  async (req, res) => {
    const {
      office_address,
      company_phone_number,
      company_email_address,
      privacy_policy,
      terms_and_conditions,
      about_us,
      team_agreement,
    } = req.body;

    const myData = await GeneralInfoModel.findOne();
    if (!myData) {
      throw new Error('general info data does not exist. invalid request');
    }

    if (office_address) {
      myData.office_address = office_address;
    }
    if (company_phone_number) {
      myData.company_phone_number = company_phone_number;
    }
    if (company_email_address) {
      myData.company_email_address = company_email_address;
    }
    if (privacy_policy) {
      myData.privacy_policy = privacy_policy;
    }
    if (terms_and_conditions) {
      myData.terms_and_conditions = terms_and_conditions;
    }
    if (about_us) {
      myData.about_us = about_us;
    }
    if (team_agreement) {
      myData.team_agreement = team_agreement;
    }

    await myData.save();

    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Fetched Successful',
      data: {
        data: myData,
      },
    });
  }
);
