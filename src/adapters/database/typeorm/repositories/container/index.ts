import { container } from 'tsyringe';
import { ClientRepository } from '../ClientRepository';
import { CategoryRepository } from '../CategoryRepository';
import { SnackRepository } from '../SnackRepository';

container.register('ClientRepository', {
  useClass: ClientRepository,
});

container.register('CategoryRepository', {
  useClass: CategoryRepository,
})

container.register('SnackRepository', {
  useClass: SnackRepository,
})