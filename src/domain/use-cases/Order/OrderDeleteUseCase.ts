import { inject, injectable } from 'tsyringe';
import { IOrderRepository } from '../../interfaces/repositories/IOrderRepository';
import { IOrder } from '../../../infra/entities/OrderEntity';

@injectable()
export default class OrderDeleteUseCase {
	constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository
	) {}

	async execute(id: string): Promise<IOrder> {
		return this.orderRepository.delete(id);
	}
}
