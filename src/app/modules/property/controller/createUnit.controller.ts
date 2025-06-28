import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { getDataFromFormOfRequest } from '../../../../helpers/getDataFromFormAR7';
import { PropertyModel } from '../model/property.model';
import { getUserDataFromRequest2 } from '../../../../helpers/getUserDataFromRequest.helper';
import { saveMultipleFileAndGiveLink } from '../../../../helpers_v2/files/saveAndGiveMultipleFileLink';
import { UnitModel } from '../model/unit.model';

export const createUnitController = myControllerHandler(async (req, res) => {
  const userData = await getUserDataFromRequest2(req);
  const formData = await getDataFromFormOfRequest(req);

  let { property_id, name, facilities, pricing, floor_number } =
    formData.fields;
  let { images } = formData.files;
  if (!property_id) {
    throw new Error('property id is missing');
  }

  const propertyData = await PropertyModel.findOne({ id: property_id });
  if (!propertyData) {
    throw new Error(
      'this id of property is not valid. no property exists with this id'
    );
  }
  if (userData.id !== propertyData.ownerId) {
    throw new Error(
      'this user is not authorized to add units to this property.'
    );
  }

  if (!name) {
    throw new Error('please provide name');
  }
  if (!floor_number) {
    throw new Error('please provide floor number');
  }
  name = name[0];
  floor_number = floor_number[0];
  const unitData = await UnitModel.create({
    name: name,
    floorNumber: floor_number[0],
    propertyId: propertyData.id,
  });
  if (facilities) {
    facilities = facilities[0];
    facilities = JSON.parse(facilities);
    unitData.facilities = facilities;
  }

  if (pricing) {
    pricing = pricing[0];
    pricing = JSON.parse(pricing);
    unitData.pricing = pricing;
  }

  if (images) {
    const arrayOfImagesLink = await saveMultipleFileAndGiveLink(
      images,
      './public/images/units'
    );
    unitData.images = arrayOfImagesLink;
  }
  await unitData.save();
  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Review Given Successfully',
    data: { unitData },
  });
});
