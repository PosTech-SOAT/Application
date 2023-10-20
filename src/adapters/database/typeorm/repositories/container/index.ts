import { container } from 'tsyringe';
import { ClientRepository } from '../ClientRepository';
import { CategoryRepository } from '../CategoryRepository';
import { SnackRepository } from '../SnackRepository';
import { AccompanimentRepository } from '../AccompanimentRepository';
import { DrinkRepository } from '../DrinkRepository';
import { OrderRepository } from '../OrderRepository';

container.register('ClientRepository', {
	useClass: ClientRepository,
});

container.register('CategoryRepository', {
	useClass: CategoryRepository,
});

container.register('SnackRepository', {
  useClass: SnackRepository,
})

container.register('AccompanimentRepository', {
  useClass: AccompanimentRepository,
})

container.register('DrinkRepository', {
  useClass: DrinkRepository,
})

container.register('OrderRepository', {
  useClass: OrderRepository,
})
