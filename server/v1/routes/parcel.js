import { Router } from 'express';
import ParcelController from '../controllers/ParcelController';
import JWT from '../middlewares/JWT';

const parcelRoutes = Router();

parcelRoutes.get('/', JWT.authenticate, ParcelController.getAll);
parcelRoutes.post('/', JWT.authenticate, ParcelController.create);
parcelRoutes.get('/:orderId', JWT.authenticate, ParcelController.getOne);
parcelRoutes.put('/:orderId', JWT.authenticate, ParcelController.update);
parcelRoutes.put('/:orderId/cancel', JWT.authenticate, ParcelController.cancel);

export default parcelRoutes;
