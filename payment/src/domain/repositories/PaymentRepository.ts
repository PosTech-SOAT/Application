import { MercadoPagoConfig, Preference } from 'mercadopago';
import { PaymentDto } from '../../infra/dto/PaymentDto';
import { IPaymentRepository } from '../interfaces/repositories/IPaymentRepository';

const GENERIC_ERROR_MESSAGE =
	'Ocorreu um erro ao tentar gerar o link de pagamento!';

export class PaymentRepository implements IPaymentRepository {
	async CreatePayment(order: PaymentDto | null) {
		if (order) {
			const client = new MercadoPagoConfig({
				accessToken: process.env.ML_ACCESS_TOKEN || '',
			});
			const preference = new Preference(client);
			try {
				const paymentDetails = await preference.create({
					body: {
						items: order.products.map((product) => ({
							id: product.id,
							title: product.name,
							currency_id: 'BRL',
							picture_url:
								'https://www.mercadopago.com/org-img/MP3/home/logomp3.gif',
							description: product.description,
							category_id: 'teste',
							quantity: 1,
							unit_price: product.price,
						})),

						payer: {
							//email teste
							email: 'liguo1122@uorak.com',
						},
						back_urls: {
							success: 'http://localhost:3000/api/orders/callback',
							failure: 'http://localhost:3000/api/orders/callback',
							pending: 'http://localhost:3000/api/orders/callback',
						},
						auto_return: 'all',
						external_reference: order.products[0].id,
					},
				});
				return paymentDetails.sandbox_init_point;
			} catch (error) {
				throw new Error(GENERIC_ERROR_MESSAGE);
			}
		}
		throw new Error(GENERIC_ERROR_MESSAGE);
	}
}
