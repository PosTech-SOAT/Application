import { Router } from 'express';
import ProductController from '../../../adapters/controllers/ProductController';

const productRoutes = Router();

const productController = new ProductController();

productRoutes.post('/', productController.create);
// productRoutes.get('/', productController.list);
// productRoutes.get('/:id', productController.findById);
// productRoutes.patch('/:id', productController.changeproductStatus);
// productRoutes.delete('/:id', orderController.delete);

export default productRoutes;
