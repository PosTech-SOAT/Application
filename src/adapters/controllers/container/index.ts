import { container } from 'tsyringe';
import { IClientRepositoryPort } from '../../../application/ports/IClientRepositoryPort';
import { ClientRepository } from '../../database/typeorm/repositories/ClientRepository';

container.registerSingleton<IClientRepositoryPort>("ClientRepository", ClientRepository);