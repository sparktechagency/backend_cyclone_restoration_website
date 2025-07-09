import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { validateMissing } from '../../../../helpers_v2/validate-missing/validateMissing';
import { MessagesModel } from '../model/message.model';

export const getOldMessagesController = myControllerHandler(
  async (req, res) => {
    // Validate required fields
    validateMissing(
      [{ name: 'conversation_id', naturalName: 'Conversation Id' }],
      req.query
    );

    const { conversation_id, page = '1', limit = '10' } = req.query;
    const refinedPage = Number(page);
    const refinedLimit = Number(limit);
    const numbersToSkip = (refinedPage - 1) * refinedLimit;

    // Count total messages
    const totalMessages = await MessagesModel.countDocuments({
      conversationId: conversation_id,
    });

    // Fetch paginated messages, sorted newest first
    const messages = await MessagesModel.find({
      conversationId: conversation_id,
    })
      .sort({ createdAt: -1 })
      .skip(numbersToSkip)
      .limit(refinedLimit);

    const totalNumberOfPages = Math.ceil(totalMessages / refinedLimit);

    // Send response
    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Messages fetched successfully',
      data: {
        currentPage: refinedPage,
        totalNumberOfItems: totalMessages,
        totalNumberOfPages,
        data: messages,
      },
    });
  }
);
