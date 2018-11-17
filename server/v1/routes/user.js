import { Router } from 'express';
import ParcelController from '../controllers/ParcelController';
import JWT from '../middlewares/JWT';
import Roles from '../middlewares/Roles';
import RequestParam from '../middlewares/RequestParam';

const userRoutes = Router();

userRoutes.get(
  '/:userId/parcels',
  RequestParam.validateParams,
  JWT.authenticate,
  Roles.isRightUser,
  ParcelController.listForUser,
);

export default userRoutes;
