import { Router } from 'express';
import ParcelController from '../controllers/ParcelController';

const parcelRoutes = Router();

parcelRoutes.get('/', ParcelController.list);
parcelRoutes.post('/', ParcelController.store);

export default parcelRoutes;
