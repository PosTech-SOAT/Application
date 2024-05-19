import { Request, Response } from 'express';
import PaymentController from './PaymentController';
import { IPaymentRepository } from '../../domain/interfaces/repositories/IPaymentRepository';
import { OrderDto } from '../dto/OrderDto';
import { OrderStatus } from '../entities/OrderEntity';

describe('PaymentController', () => {
	let paymentRepository: jest.Mocked<IPaymentRepository>;
	let paymentController: PaymentController;
	let req: Partial<Request>;
	let res: Partial<Response>;
	let statusMock: jest.Mock;
	let jsonMock: jest.Mock;

	beforeEach(() => {
		paymentRepository = {
			CreatePayment: jest.fn(),
		} as jest.Mocked<IPaymentRepository>;

		paymentController = new PaymentController(paymentRepository);

		req = {
			body: {},
		};

		statusMock = jest.fn().mockReturnThis();
		jsonMock = jest.fn();

		res = {
			status: statusMock,
			json: jsonMock,
		};
	});

	it('should create a payment link successfully', async () => {
		const orderDto: OrderDto = {
			id: 'd185c821-c7aa-426a-a002-c832c3042faf',
			status: OrderStatus.AGUARDANDO_PAGAMENTO,
			client: {
				id: 'ac79dbe2-7f57-42e7-87c3-f99059e574b3',
				name: 'Aluno FIAP',
				cpf: '11111111111',
				email: 'a123@b.com',
			},
			products: [
				{
					id: 'a66d8db8-b602-4a37-83c8-9ee83250a244',
					name: 'Hamburguer madero',
					description: 'Muito melhor que Mc',
					price: 49.9,
				},
			],
			price: 49.9,
		};
		const paymentUrl = 'http://payment.url';
		req.body = orderDto;
		paymentRepository.CreatePayment.mockResolvedValue(paymentUrl);

		await paymentController.create(
			req as Request,
			res as Response,
			paymentController,
		);

		expect(paymentRepository.CreatePayment).toHaveBeenCalledWith(orderDto);
		expect(statusMock).toHaveBeenCalledWith(201);
		expect(jsonMock).toHaveBeenCalledWith({
			message: 'Payment linked created successfully',
			payment_url: paymentUrl,
		});
	});

	it('should handle errors when creating a payment link', async () => {
		const errorMessage = 'Failed to create payment';
		paymentRepository.CreatePayment.mockRejectedValue(new Error(errorMessage));

		await paymentController.create(
			req as Request,
			res as Response,
			paymentController,
		);

		expect(statusMock).toHaveBeenCalledWith(400);
		expect(jsonMock).toHaveBeenCalledWith({ message: errorMessage });
	});
});
