import { container } from 'tsyringe';
import { IClientRepositoryPort } from '../../../application/ports/IClientRepositoryPort';
import { ClientRepository } from '../../database/typeorm/repositories/ClientRepository';
import { CategoryRepository } from '../../database/typeorm/repositories/CategoryRepository';
import { ICategoryRepositoryPort } from '../../../application/ports/ICategoryRepositoryPort';

container.registerSingleton<IClientRepositoryPort>("ClientRepository", ClientRepository);
container.registerSingleton<ICategoryRepositoryPort>("CategoryRepository", CategoryRepository);