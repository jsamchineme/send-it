import { Router } from 'express';
import ParcelController from '../controllers/ParcelController';
import JWT from '../middlewares/JWT';
import Roles from '../middlewares/Roles';
import ParcelValidator from '../middlewares/inputValidation/parcels';
import RequestParam from '../middlewares/RequestParam';

const parcelRoutes = Router();

parcelRoutes.get('/', JWT.authenticate, Roles.isAdmin, ParcelController.getAll);

parcelRoutes.post('/', JWT.authenticate, ParcelValidator.validateCreate, ParcelController.create);

parcelRoutes.get('/:parcelId', RequestParam.validateParams, JWT.authenticate, ParcelController.getOne);

parcelRoutes.put('/:parcelId', RequestParam.validateParams, JWT.authenticate, ParcelController.update);

parcelRoutes.put(
  '/:parcelId/cancel',
  RequestParam.validateParams,
  JWT.authenticate,
  Roles.isParcelOwner,
  ParcelController.cancel,
);

parcelRoutes.put(
  '/:parcelId/status',
  RequestParam.validateParams,
  JWT.authenticate,
  Roles.isAdmin,
  ParcelValidator.validateChangeStatus,
  ParcelController.changeStatus,
);

parcelRoutes.put(
  '/:parcelId/destination',
  RequestParam.validateParams,
  JWT.authenticate,
  Roles.isParcelOwner,
  ParcelValidator.validateChangeDestination,
  ParcelValidator.validateStatus,
  ParcelController.changeDestination,
);

parcelRoutes.put(
  '/:parcelId/presentLocation',
  RequestParam.validateParams,
  JWT.authenticate,
  Roles.isAdmin,
  ParcelValidator.validateChangePresentLocation,
  ParcelController.changeLocation,
);

export default parcelRoutes;
