import { container } from 'tsyringe';
import { ClientRepository } from '../ClientRepository';
import { CategoryRepository } from '../CategoryRepository';
import { OrderRepository } from '../OrderRepository';
import { ProductRepository } from '../ProductRepository';
import { PaymentRepository } from '../PaymentRepository';

container.register('ClientRepository', {
	useClass: ClientRepository,
});

container.register('CategoryRepository', {
	useClass: CategoryRepository,
});

container.register('ProductRepository', {
	useClass: ProductRepository,
});

container.register('OrderRepository', {
	useClass: OrderRepository,
});
container.register('PaymentRepository', {
	useClass: PaymentRepository,
});
