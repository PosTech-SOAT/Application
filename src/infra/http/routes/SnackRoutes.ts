import { Router } from "express";
import SnackController from "../../../adapters/controllers/SnackController";

const snackRoutes = Router();

const snackController = new SnackController();

snackRoutes.post("/", snackController.create);
snackRoutes.get("/", snackController.list);
snackRoutes.get("/:id", snackController.findById);
snackRoutes.delete("/:id", snackController.delete);

export default snackRoutes;