import { inject, injectable } from 'tsyringe';
import { IOrderRepository } from '../../interfaces/repositories/IOrderRepository';
import { OrderStatus } from '../../entities/Order';
import { IOrder } from '../../../infra/entities/OrderEntity';
import { IBaseUseCase } from '../../interfaces/use-cases/IBaseUseCase';

type OrderUpdateStatusParams = {
	id: string;
	status: OrderStatus;
};

@injectable()
export default class OrderUpdateStatusUseCase implements IBaseUseCase<OrderUpdateStatusParams, IOrder | null> {
	constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository
	) {}

	async execute({id, status}: OrderUpdateStatusParams): Promise<IOrder | null> {
		return this.orderRepository.update(id, status);
	}
}
