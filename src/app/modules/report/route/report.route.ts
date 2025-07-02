import express from 'express';
import { submitReportController } from '../controller/submitReport.controller';

const router = express.Router();

router.post('/submit-report', submitReportController);

export const reportRouter = router;
