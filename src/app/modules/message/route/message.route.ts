import express from 'express';
import { sendMessageController } from '../controller/sendMessage.controller';
import { getOldMessagesController } from '../controller/getOldMessages.controller';
import { getListOfConversationsController } from '../controller/getListOfConversations.controller';

const router = express.Router();

router.post('/send-message', sendMessageController);
router.get('/get-old-messages', getOldMessagesController);
router.get('/get-list-of-conversations', getListOfConversationsController);

export const messageRouter = router;
