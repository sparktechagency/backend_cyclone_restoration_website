import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../../shared/sendResponse';
import { UserModel } from '../../../auth_v2/model/user.model';

export const getUserListController = myControllerHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const refinedPage = Number(page);
  const refinedLimit = Number(limit);
  const numbersToSkip = (refinedPage - 1) * refinedLimit;

  // Count total users
  const totalUsers = await UserModel.countDocuments({ role: 'user' });

  // Fetch paginated users
  const userData = await UserModel.find({ role: 'user' })
    .sort({ createdAt: -1 })
    .skip(numbersToSkip)
    .limit(refinedLimit);

  const totalNumberOfPages = Math.ceil(totalUsers / refinedLimit);

  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Fetched Successfully',
    data: {
      currentPage: refinedPage,
      totalNumberOfItems: totalUsers,
      totalNumberOfPages,
      data: userData,
    },
  });
});
