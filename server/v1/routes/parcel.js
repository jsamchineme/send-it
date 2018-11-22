import { Router } from 'express';
import ParcelController from '../controllers/ParcelController';
import Authentication from '../middlewares/Authentication';
import Roles from '../middlewares/Roles';
import ParcelValidator from '../middlewares/inputValidation/parcels';
import RequestParam from '../middlewares/RequestParam';

const parcelRoutes = Router();

const { verifyToken } = Authentication;
const { validateParams } = RequestParam;
const { isAdmin, isParcelOwner } = Roles;

const {
  getAll, getOne, create, cancel, changeStatus, changeDestination, changeLocation,
} = ParcelController;

const {
  validateChangeDestination,
  validateStatus,
  validateChangePresentLocation,
  validateChangeStatus,
  validateCreate
} = ParcelValidator;

// Get all parcels
parcelRoutes.get('/', verifyToken, isAdmin, getAll);

// Create a parcel order
parcelRoutes.post('/', verifyToken, validateCreate, create);

// Get a single parcel order
parcelRoutes.get('/:parcelId', validateParams, verifyToken, getOne);

// Cancel a parcel order
parcelRoutes.put(
  '/:parcelId/cancel',
  validateParams,
  verifyToken,
  isParcelOwner,
  cancel,
);

// Change the status of a parcel order
parcelRoutes.put(
  '/:parcelId/status',
  validateParams,
  verifyToken,
  isAdmin,
  validateChangeStatus,
  changeStatus,
);

// Change the destination of a parcel order
parcelRoutes.put(
  '/:parcelId/destination',
  validateParams,
  verifyToken,
  isParcelOwner,
  validateChangeDestination,
  validateStatus,
  changeDestination,
);

// Change the present location of a parcel order
parcelRoutes.put(
  '/:parcelId/presentLocation',
  validateParams,
  verifyToken,
  isAdmin,
  validateChangePresentLocation,
  changeLocation,
);

export default parcelRoutes;
