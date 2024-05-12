import { Request, Response } from 'express';
import { container, inject } from 'tsyringe';
import { OrderStatus } from '../../domain/entities/Order';
import { PaymentRepository } from '../../domain/repositories/PaymentRepository';
import { PaymentWebhookRequestParams } from '../dto/PaymentWebhookRequestDto';
import { IPaymentRepository } from '../../domain/interfaces/repositories/IPaymentRepository';

export default class PaymentController {
	private paymentRepository: IPaymentRepository;
	constructor() {
		this.paymentRepository = new PaymentRepository();
	}

	async create(
		request: Request,
		response: Response,
		instance: OrderController,
	) {
		const createOrderUseCase = container.resolve(OrderCreateUseCase);
		try {
			const order = await createOrderUseCase.execute(request.body);
			const findOneOrderUseCase = container.resolve(OrderFindOneUseCase);
			const payment_url = await instance.paymentRepository.CreatePayment(
				await findOneOrderUseCase.execute(order.id),
			);
			return response.status(201).json({
				message: 'Order created successfully',
				payment_url: payment_url,
			});
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}
	
}
