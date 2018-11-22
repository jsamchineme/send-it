import { Router } from 'express';
import ParcelController from '../controllers/ParcelController';
import Authentication from '../middlewares/Authentication';
import Roles from '../middlewares/Roles';
import RequestParam from '../middlewares/RequestParam';

const userRoutes = Router();

const { verifyToken } = Authentication;
const { validateParams } = RequestParam;
const { isRightUser } = Roles;
const { listForUser } = ParcelController;

userRoutes.get('/:userId/parcels', validateParams, verifyToken, isRightUser, listForUser);

export default userRoutes;
