import { Router } from "express";
import DrinkController from "../../../adapters/controllers/DrinkController";

const drinkRoutes = Router();

const drinkController = new DrinkController();

drinkRoutes.post("/", drinkController.create);
drinkRoutes.get("/", drinkController.list);
drinkRoutes.get("/:id", drinkController.findById);
drinkRoutes.delete("/:id", drinkController.delete);

export default drinkRoutes;