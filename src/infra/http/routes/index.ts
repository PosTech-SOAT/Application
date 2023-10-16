import { Router } from "express";

import { clientRoutes } from "./ClientRoutes";

const router = Router();

router.use("/clients/createClient", clientRoutes);

export { router };