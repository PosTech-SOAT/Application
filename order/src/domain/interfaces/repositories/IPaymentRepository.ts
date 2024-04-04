import { OrderDto } from '../../../infra/dto/OrderDto';

export interface IPaymentRepository {
	CreatePayment(order: OrderDto | null): Promise<string | undefined>;
}
