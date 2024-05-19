import { container } from 'tsyringe';
import { PaymentRepository } from '../PaymentRepository';

container.register('PaymentRepository', {
	useClass: PaymentRepository,
});
