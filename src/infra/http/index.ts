import { Router } from "express";

import clientRoutes from "./routes/ClientRoutes";
import categoryRoutes from "./routes/CategoryRoutes";
import snackRoutes from "./routes/SnackRoutes";
import accompanimentRoutes from "./routes/AccompanimentRoutes";
import drinkRoutes from "./routes/DrinkRoutes";
import orderRoutes from "./routes/OrderRoutes";

const router = Router();

router.use("/clients", clientRoutes)
router.use("/categories", categoryRoutes)
router.use("/snacks", snackRoutes)
router.use("/accompaniments", accompanimentRoutes)
router.use("/drinks", drinkRoutes)
router.use("/orders", orderRoutes)

export default router;