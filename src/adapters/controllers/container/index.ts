import { container } from 'tsyringe';
import { IClientRepositoryPort } from '../../../application/ports/IClientRepositoryPort';
import { ClientRepository } from '../../database/typeorm/repositories/ClientRepository';
import { CategoryRepository } from '../../database/typeorm/repositories/CategoryRepository';
import { ICategoryRepositoryPort } from '../../../application/ports/ICategoryRepositoryPort';
import { SnackRepository } from '../../database/typeorm/repositories/SnackRepository';

container.registerSingleton<IClientRepositoryPort>('ClientRepository', ClientRepository);
container.registerSingleton<ICategoryRepositoryPort>('CategoryRepository', CategoryRepository);
container.registerSingleton<ICategoryRepositoryPort>('SnackRepository', SnackRepository);
