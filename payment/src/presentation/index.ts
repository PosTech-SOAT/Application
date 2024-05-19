import { Router } from 'express';

import paymentRoutes from './routes/PaymentRoutes';

const router = Router();

router.use('/payment', paymentRoutes);

export default router;
