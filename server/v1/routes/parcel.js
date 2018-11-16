import { Router } from 'express';
import ParcelController from '../controllers/ParcelController';
import JWT from '../middlewares/JWT';
import Roles from '../middlewares/Roles';


const parcelRoutes = Router();

parcelRoutes.get('/', JWT.authenticate, ParcelController.getAll);
parcelRoutes.post('/', JWT.authenticate, ParcelController.create);
parcelRoutes.get('/:parcelId', JWT.authenticate, ParcelController.getOne);
parcelRoutes.put('/:parcelId', JWT.authenticate, ParcelController.update);
parcelRoutes.put('/:parcelId/cancel', JWT.authenticate, ParcelController.cancel);

parcelRoutes.put(
  '/:parcelId/destination',
  JWT.authenticate,
  Roles.isParcelOwner,
  ParcelController.changeDestination,
);

export default parcelRoutes;
