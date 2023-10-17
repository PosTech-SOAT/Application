import { Router } from "express";
import ClientController from "../../../adapters/controllers/ClientController";

const clientRoutes = Router();

const clientController = new ClientController();

clientRoutes.post('/', clientController.create);
clientRoutes.get('/', clientController.list);

export { clientRoutes };