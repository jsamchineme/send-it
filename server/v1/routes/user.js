import { Router } from 'express';
import ParcelController from '../controllers/ParcelController';

const userRoutes = Router();

userRoutes.get('/:userId/parcels', ParcelController.listForUser);

export default userRoutes;
