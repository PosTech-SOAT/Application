import { container } from 'tsyringe';
import { ClientRepository } from '../ClientRepository';
import { CategoryRepository } from '../CategoryRepository';
import { OrderRepository } from '../OrderRepository';
import { ProductRepository } from '../ProductRepository';
import { IPaymentRepository } from '../IPaymentRepository';
import { MercadoPagoPayment } from '../../../infra/payment/MercadoPagoPayment';

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
container.register<IPaymentRepository>('PaymentRepository', {
	useFactory: c => {
		if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
			return new MercadoPagoPaymentMock();
		} else {
			const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
			if (!accessToken) {
				throw new Error('MERCADO_PAGO_ACCESS_TOKEN is not defined in the environment variables.');
			}
			return new MercadoPagoPayment(accessToken);
		}
	}
});
