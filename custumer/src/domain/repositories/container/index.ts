import { container } from 'tsyringe';
import { ClientRepository } from '../ClientRepository';

container.register('ClientRepository', {
	useClass: ClientRepository,
});


