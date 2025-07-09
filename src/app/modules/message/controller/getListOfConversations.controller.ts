import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { getUserDataFromRequest2 } from '../../../../helpers/getUserDataFromRequest.helper';
import { ConversationModel } from '../model/conversation.model';
import { MessagesModel } from '../model/message.model';
import { getOtherString } from '../../../../helpers_v2/string/getOtherStringOfTheArray.helper';
import { UserModel } from '../../auth_v2/model/user.model';
import { formatTo12HourTime } from '../../../../helpers_v2/date/convertTo12HourTime.helper';

export const getListOfConversationsController = myControllerHandler(
  async (req, res) => {
    const userData = await getUserDataFromRequest2(req);

    // ✅ Get page and limit
    const { page = '1', limit = '10' } = req.query;
    const refinedPage = Number(page);
    const refinedLimit = Number(limit);
    const skip = (refinedPage - 1) * refinedLimit;

    // ✅ Get total count
    const totalConversations = await ConversationModel.countDocuments({
      involvedPeoplesId: userData.id,
    });

    // ✅ Get paginated conversations
    const conversationData = await ConversationModel.find({
      involvedPeoplesId: userData.id,
    })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(refinedLimit);

    const arrayOfData: any = [];

    for (let i = 0; i < conversationData.length; i++) {
      const singleData = conversationData[i];
      const latestMessage = await MessagesModel.findOne({
        conversationId: singleData.id,
      }).sort({ createdAt: -1 });

      const otherUserId = getOtherString(
        singleData.involvedPeoplesId,
        userData.id
      );
      const otherUserData = await UserModel.findOne({ id: otherUserId });
      if (!otherUserData) continue;

      const timeAR7: any = latestMessage?.createdAt;
      arrayOfData.push({
        name: otherUserData.name,
        profilePictureUrl: otherUserData.profilePictureUrl,
        latestMessage: latestMessage?.message,
        time: formatTo12HourTime(timeAR7),
      });
    }

    const totalPages = Math.ceil(totalConversations / refinedLimit);

    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Fetched Successful',
      data: {
        currentPage: refinedPage,
        totalItems: totalConversations,
        totalPages,
        data: arrayOfData,
      },
    });
  }
);
