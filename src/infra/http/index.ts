import { Router } from "express";

import clientRoutes from "./routes/ClientRoutes";
import categoryRoutes from "./routes/CategoryRoutes";
import snackRoutes from "./routes/SnackRoutes";
import accompanimentRoutes from "./routes/AccompanimentRoutes";
import drinkRoutes from "./routes/DrinkRoutes";

const router = Router();

router.use("/clients", clientRoutes)
router.use("/categories", categoryRoutes)
router.use("/snacks", snackRoutes)
router.use("/accompaniments", accompanimentRoutes)
router.use("/drinks", drinkRoutes)

export default router;