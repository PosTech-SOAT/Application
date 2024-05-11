export interface ClientRepository {
    getById(id: string): Promise<Client | null>;
    getAll(): Promise<Client[]>;
    create(client: Client): Promise<void>;
    update(client: Client): Promise<void>;
    delete(id: string): Promise<void>;
}


import { container } from 'tsyringe';
import { ClientRepository } from '../ClientRepository';

container.register('ClientRepository', {
	useClass: ClientRepository,
});


