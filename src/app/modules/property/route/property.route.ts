import express from 'express';
import { getPropertyDataFromZooplaController } from '../controller/getPropertyDataFromZoopla.controller';
import { createPropertyController } from '../controller/createProperty.controller';
import { createUnitController } from '../controller/createUnit.controller';

const router = express.Router();

router.post(
  '/get-property-data-from-zoopla',
  getPropertyDataFromZooplaController
);

router.post('/create-property', createPropertyController);
router.post('/create-unit', createUnitController);

export const propertyRouter = router;
