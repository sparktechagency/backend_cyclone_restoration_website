import express from 'express';
import { getGeneralInfoController } from '../controller/getGeneralInfo.controller';
import { editGeneralInfoController } from '../controller/editGeneralInfo.controller';
import { getGeneralInfoControllerV2 } from '../controller/getGeneralInfoVersion2.controller';
import { contactUsController } from '../controller/contactUs.controller';

const generalInfoRouter = express.Router();

generalInfoRouter.get('/', getGeneralInfoControllerV2);
generalInfoRouter.get('/:name', getGeneralInfoController);
generalInfoRouter.post('/edit-general-info', editGeneralInfoController);
generalInfoRouter.post('/contact-us', contactUsController);

export { generalInfoRouter };
