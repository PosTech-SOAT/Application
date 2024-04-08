import { Router } from 'express';
import ClientController from '../../infra/controllers/ClientController';

const clientRoutes = Router();

const clientController = new ClientController();

clientRoutes.post('/', clientController.create);
clientRoutes.get('/', clientController.list);
clientRoutes.patch('/:cpf', clientController.update);
clientRoutes.get('/:param', async (req, res) => {
	const { param } = req.params;
	const isUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(param);

	if (isUUID) {
		return clientController.findById(req, res);
	} else {
		return clientController.findByCpf(req, res);
	}
});

export default clientRoutes;
