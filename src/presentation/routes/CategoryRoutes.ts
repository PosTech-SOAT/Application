import { Router } from 'express';
import CategoryController from '../../infra/controllers/CategoryController';

const categoryRoutes = Router();

const categoryController = new CategoryController();

categoryRoutes.post('/', categoryController.create);
categoryRoutes.get('/', categoryController.list);
categoryRoutes.get('/:id', categoryController.findById);
categoryRoutes.patch('/:id', categoryController.update);
categoryRoutes.delete('/:id', categoryController.delete);

export default categoryRoutes;
