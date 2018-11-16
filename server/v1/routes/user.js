import { Router } from 'express';
import ParcelController from '../controllers/ParcelController';
import JWT from '../middlewares/JWT';
import Roles from '../middlewares/Roles';

const userRoutes = Router();

userRoutes.get(
  '/:userId/parcels',
  JWT.authenticate,
  Roles.isRightUser,
  ParcelController.listForUser,
);

export default userRoutes;
