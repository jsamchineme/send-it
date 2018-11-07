import { Router } from 'express';
import parcelRoutes from './parcel';
import userRoutes from './user';
import authRoutes from './auth';

const router = Router();

router.use('/parcels', parcelRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

export default router;
