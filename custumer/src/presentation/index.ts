import { Router } from 'express';

import clientRoutes from './routes/ClientRoutes';

const router = Router();

router.use('/clients', clientRoutes);

export default router;
