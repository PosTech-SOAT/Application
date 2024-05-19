import { OrderDto } from '../../infra/dto/OrderDto';
import { IPaymentRepository } from '../interfaces/repositories/IPaymentRepository';
import axios from 'axios';

const GENERIC_ERROR_MESSAGE =
	'Ocorreu um erro ao tentar gerar o link de pagamento!';

export class PaymentRepository implements IPaymentRepository {
	async CreatePayment(order: OrderDto | null) {
		if (order) {
			try {
				const { payment_url } = (
					await axios.post(
						'http://postech_payment_container:3002/api/payment',
						order,
					)
				).data;
				return payment_url;
			} catch (error) {
				throw new Error(GENERIC_ERROR_MESSAGE);
			}
		}
		throw new Error(GENERIC_ERROR_MESSAGE);
	}
}
