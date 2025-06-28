import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { getUserDataFromRequest2 } from '../../../../helpers/getUserDataFromRequest.helper';
import { getDataFromFormOfRequest } from '../../../../helpers/getDataFromFormAR7';
import { saveMultipleFileAndGiveLink } from '../../../../helpers_v2/files/saveAndGiveMultipleFileLink';
import { PropertyModel } from '../model/property.model';

export const createPropertyController = myControllerHandler(
  async (req, res) => {
    const userData = await getUserDataFromRequest2(req);
    const formData = await getDataFromFormOfRequest(req);
    let {
      name,
      address_line_1,
      address_line_2,
      description,
      is_parking_available,
      is_garden_available,
      is_lift_available,
      number_of_floors,
      form_submission_fee,
      is_income_tax_doc_compulsary,
      is_id_card_compulsary,
      is_credit_application_doc_compulsary,
    } = formData.fields;

    if (!name) {
      throw new Error('please provide name');
    }
    if (!address_line_1) {
      throw new Error('please provide address line 1');
    }
    if (!address_line_2) {
      throw new Error('please provide address line 2');
    }
    if (!description) {
      throw new Error('please provide description');
    }
    if (!number_of_floors) {
      throw new Error('please provide number of floors');
    }

    name = name[0];
    address_line_1 = address_line_1[0];
    address_line_2 = address_line_2[0];
    description = description[0];
    number_of_floors = number_of_floors[0];
    const propertyData = await PropertyModel.create({
      ownerId: userData.id,
      name: name,
      addressLine1: address_line_1,
      addressLine2: address_line_2,
      description: description,
      numberOfFloors: number_of_floors,
    });

    // console.log({
    //   name,
    //   address_line_1,
    //   address_line_2,
    //   description,
    //   is_parking_available,
    //   is_garden_available,
    //   is_lift_available,
    //   number_of_floors,
    // });

    const images = formData.files.images;
    if (images) {
      const arrayOfImagesLink = await saveMultipleFileAndGiveLink(
        images,
        './public/images/properties'
      );
      propertyData.images = arrayOfImagesLink;
    }
    if (is_parking_available) {
      is_parking_available = is_parking_available[0];
      if (is_parking_available === 'true') {
        propertyData.isParkingAvailable = true;
      }
    }
    if (is_garden_available) {
      is_garden_available = is_garden_available[0];
      if (is_garden_available === 'true') {
        propertyData.isGardenAvailable = true;
      }
    }
    if (is_lift_available) {
      is_lift_available = is_lift_available[0];
      if (is_lift_available === 'true') {
        propertyData.isLiftAvailable = true;
      }
    }
    //
    if (form_submission_fee) {
      form_submission_fee = form_submission_fee[0];
      propertyData.formSubmissionFee = form_submission_fee;
    }
    if (is_income_tax_doc_compulsary) {
      is_income_tax_doc_compulsary = is_income_tax_doc_compulsary[0];
      if (is_income_tax_doc_compulsary === 'true') {
        propertyData.isIncomeTaxDocCompulsary = true;
      }
    }
    if (is_id_card_compulsary) {
      is_id_card_compulsary = is_id_card_compulsary[0];
      if (is_id_card_compulsary === 'true') {
        propertyData.isIdCardCompulsary = true;
      }
    }
    if (is_credit_application_doc_compulsary) {
      is_credit_application_doc_compulsary =
        is_credit_application_doc_compulsary[0];
      if (is_credit_application_doc_compulsary === 'true') {
        propertyData.isCreditApplicationDocCompulsary = true;
      }
    }
    await propertyData.save();

    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Review Given Successfully',
      data: {
        data: propertyData,
      },
    });
  }
);
