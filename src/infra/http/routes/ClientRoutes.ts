import { Router } from "express";
import ClientController from "../../../adapters/controllers/ClientController";

const clientRoutes = Router();

const createClientController = new ClientController();

clientRoutes.post('/', createClientController.create);

export { clientRoutes };