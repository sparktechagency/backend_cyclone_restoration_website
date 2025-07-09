import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { getUserDataFromRequest2 } from '../../../../helpers/getUserDataFromRequest.helper';
import { ConversationModel } from '../model/conversation.model';
import { validateMissing } from '../../../../helpers_v2/validate-missing/validateMissing';
import sendResponse from '../../../../shared/sendResponse';
import { MessagesModel } from '../model/message.model';

export const sendMessageController = myControllerHandler(async (req, res) => {
  const userData = await getUserDataFromRequest2(req);
  validateMissing(
    [
      { name: 'receiverId', naturalName: "Receiver's Id" },
      { name: 'message', naturalName: 'Message' },
    ],
    req.body
  );
  const { receiverId, message } = req.body;

  const peoplesId = [receiverId, userData.id];

  let conversationData = await ConversationModel.findOne({
    involvedPeoplesId: { $all: peoplesId, $size: peoplesId.length },
  });

  if (!conversationData) {
    conversationData = await ConversationModel.create({
      involvedPeoplesId: peoplesId,
    });
  }
  const messageData = await MessagesModel.create({
    message: message,
    senderId: userData.id,
    receiverId: receiverId,
    conversationId: conversationData.id,
  });
  conversationData.updatedAt = new Date();
  await conversationData.save();
  const myDate = new Date();

  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Fetched Successful',
    data: {
      data: messageData,
    },
  });
});
