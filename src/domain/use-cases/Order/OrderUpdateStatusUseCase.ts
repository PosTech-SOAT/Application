import { inject, injectable } from 'tsyringe';
import { IOrderRepository } from '../../interfaces/repositories/IOrderRepository';
import { OrderStatus } from '../../entities/Order';
import { IOrder } from '../../../infra/entities/OrderEntity';

@injectable()
export default class OrderUpdateStatusUseCase {
	constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository
	) {}

	async execute(id: string, status: OrderStatus): Promise<IOrder | null> {
		return this.orderRepository.update(id, status);
	}
}
