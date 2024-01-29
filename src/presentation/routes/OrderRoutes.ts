import { Router } from 'express';
import OrderController from '../../infra/controllers/OrderController';

const orderRoutes = Router();

const orderController = new OrderController();

orderRoutes.post('/', (req, res) =>
	orderController.create(req, res, orderController),
);
orderRoutes.get('/', orderController.list);
orderRoutes.get('/callback', (req, res) =>
	orderController.paymentWebhook(req, res, orderController),
);
orderRoutes.get('/queue', orderController.listByStatus);
orderRoutes.get('/:id', orderController.findById);
orderRoutes.patch('/:id', (req, res) =>
	orderController.changeOrderStatus(req, res, orderController),
);
orderRoutes.delete('/:id', orderController.delete);

export default orderRoutes;
