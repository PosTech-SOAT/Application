import { Router } from "express";
import ClientController from "../../../adapters/controllers/ClientController";

const clientRoutes = Router();

const clientController = new ClientController();

clientRoutes.post("/", clientController.create);
clientRoutes.get("/", clientController.list);
clientRoutes.get("/:id", clientController.findById);
export default clientRoutes;