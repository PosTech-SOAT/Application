import { Router } from 'express';
import ClientController from '../../infra/controllers/ClientController';

const clientRoutes = Router();

const clientController = new ClientController();

clientRoutes.post('/', clientController.create);
clientRoutes.get('/', clientController.list);
clientRoutes.patch('/:cpf', clientController.update);
clientRoutes.get('/:cpf', clientController.findByCpf);

export default clientRoutes;
