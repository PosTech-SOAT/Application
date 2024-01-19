import { container } from 'tsyringe';
import { IClientRepository } from '../../../application/ports/IClientRepository';
import { ClientRepository } from '../../database/typeorm/repositories/ClientRepository';
import { CategoryRepository } from '../../database/typeorm/repositories/CategoryRepository';
import { ICategoryRepository } from '../../../application/ports/ICategoryRepository';
import { OrderRepository } from '../../database/typeorm/repositories/OrderRepository';
import { IOrderRepository } from '../../../application/ports/IOrderRepository';
import { IProductRepository } from '../../../application/ports/IProductRespositoryPort';
import { ProductRepository } from '../../database/typeorm/repositories/ProductRepository';

container.registerSingleton<IClientRepository>('ClientRepository', ClientRepository);
container.registerSingleton<ICategoryRepository>('CategoryRepository', CategoryRepository);
container.registerSingleton<IOrderRepository>('OrderRepository', OrderRepository);
container.registerSingleton<IProductRepository>('ProductRepository', ProductRepository);

