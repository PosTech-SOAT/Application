import { container } from 'tsyringe';
import { IClientRepository } from '../../../domain/interfaces/repositories/IClientRepository';
import { ICategoryRepository } from '../../../domain/interfaces/repositories/ICategoryRepository';
import { IOrderRepository } from '../../../domain/interfaces/repositories/IOrderRepository';
import { IProductRepository } from '../../../domain/interfaces/repositories/IProductRespository';
import { ProductRepository } from '../../../domain/repositories/ProductRepository';
import { OrderRepository } from '../../../domain/repositories/OrderRepository';
import { CategoryRepository } from '../../../domain/repositories/CategoryRepository';
import { ClientRepository } from '../../../domain/repositories/ClientRepository';

container.registerSingleton<IClientRepository>('ClientRepository', ClientRepository);
container.registerSingleton<ICategoryRepository>('CategoryRepository', CategoryRepository);
container.registerSingleton<IOrderRepository>('OrderRepository', OrderRepository);
container.registerSingleton<IProductRepository>('ProductRepository', ProductRepository);

