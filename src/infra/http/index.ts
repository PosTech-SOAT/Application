import { Router } from "express";

import clientRoutes from "./routes/ClientRoutes";
import categoryRoutes from "./routes/CategoryRoutes";
import snackRoutes from "./routes/SnackRoutes";

const router = Router();

router.use("/clients", clientRoutes)
router.use("/categories", categoryRoutes)
router.use("/snacks", snackRoutes)

export default router;