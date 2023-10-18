import { Router } from "express";

import clientRoutes from "./routes/ClientRoutes";
import categoryRoutes from "./routes/CategoryRoutes";

const router = Router();

router.use("/clients", clientRoutes)
router.use("/categories", categoryRoutes)

export default router;