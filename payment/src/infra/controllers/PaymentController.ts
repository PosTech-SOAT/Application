import { Request, Response } from 'express';
import { IPaymentRepository } from '../../domain/interfaces/repositories/IPaymentRepository';
import { OrderDto } from '../dto/OrderDto';
export default class PaymentController {
	private paymentRepository: IPaymentRepository;
	constructor(paymentRepository: IPaymentRepository) {
		this.paymentRepository = paymentRepository;
	}

	async create(
		request: Request,
		response: Response,
		instance: PaymentController,
	) {
		try {
			const payment_url = await instance.paymentRepository.CreatePayment(
				request.body as OrderDto,
			);
			return response.status(201).json({
				message: 'Payment linked created successfully',
				payment_url: payment_url,
			});
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}
}
