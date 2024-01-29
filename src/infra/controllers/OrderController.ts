import { Request, Response } from 'express';
import { container, inject } from 'tsyringe';
import OrderCreateUseCase from '../../domain/use-cases/Order/OrderCreateUseCase';
import OrderListUseCase from '../../domain/use-cases/Order/OrderListUseCase';
import OrderListByStatusUseCase from '../../domain/use-cases/Order/OrderListByStatusUseCase';
import OrderFindOneUseCase from '../../domain/use-cases/Order/OrderFindOneUseCase';
import OrderUpdateStatusUseCase from '../../domain/use-cases/Order/OrderUpdateStatusUseCase';
import { OrderStatus } from '../../domain/entities/Order';
import OrderDeleteUseCase from '../../domain/use-cases/Order/OrderDeleteUseCase';
import { PaymentRepository } from '../../domain/repositories/PaymentRepository';
import { PaymentWebhookRequestParams } from '../dto/PaymentWebhookRequestDto';
import { IPaymentRepository } from '../../domain/interfaces/repositories/IPaymentRepository';

export default class OrderController {
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

	async list(request: Request, response: Response) {
		const listOrderUseCase = container.resolve(OrderListUseCase);
		try {
			const orders = await listOrderUseCase.execute();

			return response.status(200).json(orders);
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async listByStatus(reques: Request, response: Response) {
		const listOrderByStatusUseCase = container.resolve(
			OrderListByStatusUseCase,
		);
		try {
			const orders = await listOrderByStatusUseCase.execute();

			return response.status(200).json(orders);
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async findById(request: Request, response: Response) {
		const findOneOrderUseCase = container.resolve(OrderFindOneUseCase);
		try {
			const order = await findOneOrderUseCase.execute(request.params.id);

			return response.status(200).json(order);
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	private async executeStatusUpdate(id: string, status: OrderStatus) {
		const findOneOrderUseCase = container.resolve(OrderUpdateStatusUseCase);
		await findOneOrderUseCase.execute({ id, status });
	}

	async changeOrderStatus(
		request: Request,
		response: Response,
		instance: OrderController,
	) {
		try {
			await instance.executeStatusUpdate(
				request.params.id,
				request.query.status as OrderStatus,
			);
			return response
				.status(200)
				.json({ message: 'Order updated successfully' });
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async paymentWebhook(
		request: Request,
		response: Response,
		instance: OrderController,
	) {
		const query = request.query as unknown as PaymentWebhookRequestParams;
		const status =
			query.status === 'approved'
				? OrderStatus.RECEBIDO
				: OrderStatus.AGUARDANDO_PAGAMENTO;
		try {
			await instance.executeStatusUpdate(query.external_reference, status);

			return response.status(200).json({
				message: 'Order updated successfully',
				order_id: query.external_reference,
			});
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async delete(request: Request, response: Response) {
		const deleteOrderUseCase = container.resolve(OrderDeleteUseCase);
		try {
			await deleteOrderUseCase.execute(request.params.id);

			return response
				.status(200)
				.json({ message: 'Order deleted successfully' });
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}
}
