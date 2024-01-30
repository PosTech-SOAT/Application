import { Router } from 'express';
import ProductController from '../../infra/controllers/ProductController';

const productRoutes = Router();

const productController = new ProductController();

productRoutes.post('/', productController.create);
productRoutes.get('/', productController.list);
productRoutes.get('/:id', productController.findById);
productRoutes.get('/category/:id', productController.findAllByCategory);
productRoutes.patch('/:id', productController.update);
productRoutes.delete('/:id', productController.delete);

export default productRoutes;
