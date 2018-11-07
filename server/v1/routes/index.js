import { Router } from 'express';
import parcelRoutes from './parcel';

const router = Router();

router.use('/parcels', parcelRoutes);

export default router;
