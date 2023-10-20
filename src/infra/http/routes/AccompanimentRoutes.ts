import { Router } from "express";
import AccompanimentController from "../../../adapters/controllers/AccompanimentController";

const accompanimentRoutes = Router();

const accompanimentController = new AccompanimentController();

accompanimentRoutes.post("/", accompanimentController.create);
accompanimentRoutes.get("/", accompanimentController.list);
accompanimentRoutes.get("/:id", accompanimentController.findById);
accompanimentRoutes.delete("/:id", accompanimentController.delete);

export default accompanimentRoutes;