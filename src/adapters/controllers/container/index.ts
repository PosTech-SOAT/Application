import { container } from 'tsyringe';
import { IClientRepositoryPort } from '../../../application/ports/IClientRepositoryPort';
import { ClientRepository } from '../../database/typeorm/repositories/ClientRepository';
import { CategoryRepository } from '../../database/typeorm/repositories/CategoryRepository';
import { ICategoryRepositoryPort } from '../../../application/ports/ICategoryRepositoryPort';
import { SnackRepository } from '../../database/typeorm/repositories/SnackRepository';
import { IAccompanimentRepositoryPort } from '../../../application/ports/IAccompanimentRepositoryPort';
import { AccompanimentRepository } from '../../database/typeorm/repositories/AccompanimentRepository';
import { IDrinkRepositoryPort } from '../../../application/ports/IOrderRepositoryPort';
import { DrinkRepository } from '../../database/typeorm/repositories/DrinkRepository';

container.registerSingleton<IClientRepositoryPort>("ClientRepository", ClientRepository);
container.registerSingleton<ICategoryRepositoryPort>("CategoryRepository", CategoryRepository);
container.registerSingleton<ICategoryRepositoryPort>("SnackRepository", SnackRepository);
container.registerSingleton<IAccompanimentRepositoryPort>("AccompanimentRepository", AccompanimentRepository);
container.registerSingleton<IDrinkRepositoryPort>("DrinkRepository", DrinkRepository);