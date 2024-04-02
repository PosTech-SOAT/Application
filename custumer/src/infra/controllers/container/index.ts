import { container } from 'tsyringe';
import { ClientRepository } from '../../../domain/repositories/ClientRepository';
import { IClientRepository } from '../../../domain/interfaces/repositories/IClientRepository';

container.registerSingleton<IClientRepository>('ClientRepository', ClientRepository );

