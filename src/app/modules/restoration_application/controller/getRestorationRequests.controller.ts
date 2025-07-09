import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { checkIfUserRequestingAdmin3 } from '../../../../helpers/checkIfRequestedUserAdmin';
import { RestorationApplicationModel } from '../model/RestorationApplication.model';

export const getRestorationRequestController = myControllerHandler(
  async (req, res) => {
    await checkIfUserRequestingAdmin3(req);

    const { page = 1, limit = 10 } = req.query;
    const refinedPage = Number(page);
    const refinedLimit = Number(limit);
    const numbersToSkip = (refinedPage - 1) * refinedLimit;

    // Count total documents
    const totalApplications =
      await RestorationApplicationModel.countDocuments();

    // Fetch paginated data
    const applicationData = await RestorationApplicationModel.find({})
      .sort({ createdAt: -1 })
      .skip(numbersToSkip)
      .limit(refinedLimit);

    const totalNumberOfPages = Math.ceil(totalApplications / refinedLimit);

    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Fetched Successfully',
      data: {
        currentPage: refinedPage,
        totalNumberOfItems: totalApplications,
        totalNumberOfPages,
        data: applicationData,
      },
    });
  }
);
