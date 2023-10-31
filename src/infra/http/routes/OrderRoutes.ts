import { Router } from 'express';
import OrderController from '../../../adapters/controllers/OrderController';

const orderRoutes = Router();

const orderController = new OrderController();

orderRoutes.post('/', orderController.create);
orderRoutes.get('/', orderController.list);
orderRoutes.get('/queue', orderController.listByStatus);
orderRoutes.get('/:id', orderController.findById);
orderRoutes.patch('/:id', orderController.changeOrderStatus);
orderRoutes.delete('/:id', orderController.delete);

export default orderRoutes;
