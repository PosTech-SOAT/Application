import { container } from 'tsyringe';
import { IClientRepositoryPort } from '../../../application/ports/IClientRepositoryPort';
import { ClientRepository } from '../../database/typeorm/repositories/ClientRepository';
import { CategoryRepository } from '../../database/typeorm/repositories/CategoryRepository';
import { ICategoryRepositoryPort } from '../../../application/ports/ICategoryRepositoryPort';
import { OrderRepository } from '../../database/typeorm/repositories/OrderRepository';
import { IOrderRepositoryPort } from '../../../application/ports/IOrderRepositoryPort';
import { IProductRepositoryPort } from '../../../application/ports/IProductRespositoryPort';
import { ProductRepository } from '../../database/typeorm/repositories/ProductRepository';

container.registerSingleton<IClientRepositoryPort>('ClientRepository', ClientRepository);
container.registerSingleton<ICategoryRepositoryPort>('CategoryRepository', CategoryRepository);
container.registerSingleton<IOrderRepositoryPort>('OrderRepository', OrderRepository);
container.registerSingleton<IProductRepositoryPort>('ProductRepository', ProductRepository);

