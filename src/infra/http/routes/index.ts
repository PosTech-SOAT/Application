import { Router } from "express";

import { clientRoutes } from "./ClientRoutes";

const router = Router();

router.use("/createClient", clientRoutes);

export { router };