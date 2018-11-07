import { Router } from 'express';
import ParcelController from '../controllers/ParcelController';

const parcelRoutes = Router();

parcelRoutes.get('/', ParcelController.list);
parcelRoutes.post('/', ParcelController.store);
parcelRoutes.get('/:orderId', ParcelController.show);
parcelRoutes.delete('/:orderId', ParcelController.cancel);

export default parcelRoutes;
