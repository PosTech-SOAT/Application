import axios from 'axios';
import { IPaymentRepository } from '../../domain/repositories/IPaymentRepository';

export class MercadoPagoPayment implements IPaymentRepository {
	private baseUrl: string = 'https://api.mercadopago.com/instore/orders/qr/seller/collectors/';
	private accessToken: string;

	constructor(accessToken: string) {
		this.accessToken = accessToken;
	}

	async createQrCodePayment(orderId: string, amount: number): Promise<any> {
		const url = `${this.baseUrl}${162079429}/pos/${orderId}/qrs`;
		try {
			const response = await axios.post(
				url,
				{
					external_reference: orderId,
					items: [
						{
							title: 'Pagamento do Pedido',
							description: 'Descrição detalhada do Pedido',
							quantity: 1,
							unit_price: amount
						}
					]
				},
				{
					headers: {
						'Authorization': `Bearer ${this.accessToken}`,
						'Content-Type': 'application/json'
					}
				}
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	}
}
