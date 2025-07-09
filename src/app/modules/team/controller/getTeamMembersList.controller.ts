import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { UserModel } from '../../auth_v2/model/user.model';

export const getTeamMembersListController = myControllerHandler(
  async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const refinedPage = Number(page);
    const refinedLimit = Number(limit);
    const numbersToSkip = (refinedPage - 1) * refinedLimit;

    // Count total team members
    const totalTeamMembers = await UserModel.countDocuments({ role: 'team' });

    // Fetch paginated team members
    const teamsData = await UserModel.find({ role: 'team' })
      .sort({ createdAt: -1 })
      .skip(numbersToSkip)
      .limit(refinedLimit);

    const totalNumberOfPages = Math.ceil(totalTeamMembers / refinedLimit);

    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Fetched Successfully',
      data: {
        currentPage: refinedPage,
        totalNumberOfItems: totalTeamMembers,
        totalNumberOfPages,
        data: teamsData,
      },
    });
  }
);
