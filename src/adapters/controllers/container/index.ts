import { container } from 'tsyringe';
import { IClientRepositoryPort } from '../../../application/ports/IClientRepositoryPort';
import { ClientRepository } from '../../database/typeorm/repositories/ClientRepository';
import { CategoryRepository } from '../../database/typeorm/repositories/CategoryRepository';
import { ICategoryRepositoryPort } from '../../../application/ports/ICategoryRepositoryPort';
import { SnackRepository } from '../../database/typeorm/repositories/SnackRepository';
import { IAccompanimentRepositoryPort } from '../../../application/ports/IAccompanimentRepositoryPort';
import { AccompanimentRepository } from '../../database/typeorm/repositories/AccompanimentRepository';
import { DrinkRepository } from '../../database/typeorm/repositories/DrinkRepository';
import { IDrinkRepositoryPort } from '../../../application/ports/IDrinkRepositoryPort';
import { OrderRepository } from '../../database/typeorm/repositories/OrderRepository';
import { IOrderRepositoryPort } from '../../../application/ports/IOrderRepositoryPort';

container.registerSingleton<IClientRepositoryPort>("ClientRepository", ClientRepository);
container.registerSingleton<ICategoryRepositoryPort>("CategoryRepository", CategoryRepository);
container.registerSingleton<ICategoryRepositoryPort>("SnackRepository", SnackRepository);
container.registerSingleton<IAccompanimentRepositoryPort>("AccompanimentRepository", AccompanimentRepository);
container.registerSingleton<IDrinkRepositoryPort>("DrinkRepository", DrinkRepository);
container.registerSingleton<IOrderRepositoryPort>("OrderRepository", OrderRepository);
