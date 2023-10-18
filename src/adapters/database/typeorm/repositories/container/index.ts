import { container } from 'tsyringe';
import { ClientRepository } from '../ClientRepository';
import { CategoryRepository } from '../CategoryRepository';

container.register('ClientRepository', {
  useClass: ClientRepository,
});

container.register('CategoryRepository', {
  useClass: CategoryRepository,
})