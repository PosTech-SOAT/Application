import { container } from 'tsyringe';
import { ICreateClientPort } from '../../../application/ports/ICreateClientPort';
import { ClientRepository } from '../../database/typeorm/repositories/ClientRepository';

container.registerSingleton<ICreateClientPort>("ClientRepository", ClientRepository);