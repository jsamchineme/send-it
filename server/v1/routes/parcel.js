import { Router } from 'express';
import ParcelController from '../controllers/ParcelController';

const parcelRoutes = Router();

parcelRoutes.get('/', ParcelController.getAll);
parcelRoutes.post('/', ParcelController.create);
parcelRoutes.get('/:orderId', ParcelController.getOne);
parcelRoutes.put('/:orderId', ParcelController.update);
parcelRoutes.put('/:orderId/cancel', ParcelController.cancel);

export default parcelRoutes;
