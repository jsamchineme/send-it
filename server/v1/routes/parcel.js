import { Router } from 'express';
import ParcelController from '../controllers/ParcelController';

const parcelRoutes = Router();

parcelRoutes.get('/', ParcelController.getAll);

export default parcelRoutes;
