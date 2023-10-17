import { Router } from "express";

import { clientRoutes } from "./ClientRoutes";

const router = Router();

// Client routes
router.use("/clients/createClient", clientRoutes);
router.use("/clients/list", clientRoutes);

export { router };