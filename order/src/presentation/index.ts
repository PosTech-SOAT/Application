import { Router } from 'express';

import clientRoutes from './routes/ClientRoutes';
import categoryRoutes from './routes/CategoryRoutes';
import orderRoutes from './routes/OrderRoutes';
import productRoutes from './routes/ProductRoutes';

const router = Router();

router.use('/clients', clientRoutes);
router.use('/categories', categoryRoutes);
router.use('/orders', orderRoutes);
router.use('/products', productRoutes);

export default router;
