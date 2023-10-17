import { Router } from "express";

import clientRoutes from "./ClientRoutes";

const router = Router();

router.use("/clients", clientRoutes)

export default router;