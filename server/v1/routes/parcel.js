import { Router } from 'express';
import ParcelController from '../controllers/ParcelController';
import JWT from '../middlewares/JWT';
import Roles from '../middlewares/Roles';
import ParcelValidator from '../middlewares/inputValidation/parcels';


const parcelRoutes = Router();

parcelRoutes.get('/', JWT.authenticate, ParcelController.getAll);

parcelRoutes.post('/', JWT.authenticate, ParcelValidator.validateCreate, ParcelController.create);

parcelRoutes.get('/:parcelId', JWT.authenticate, ParcelController.getOne);
parcelRoutes.put('/:parcelId', JWT.authenticate, ParcelController.update);
parcelRoutes.put('/:parcelId/cancel', JWT.authenticate, ParcelController.cancel);

parcelRoutes.put(
  '/:parcelId/status',
  JWT.authenticate,
  Roles.isAdmin,
  ParcelValidator.validateChangeStatus,
  ParcelController.changeStatus,
);

parcelRoutes.put(
  '/:parcelId/destination',
  JWT.authenticate,
  Roles.isParcelOwner,
  ParcelValidator.validateChangeDestination,
  ParcelController.changeDestination,
);

export default parcelRoutes;
