import { inject, injectable } from 'tsyringe';
import { IOrderRepository } from '../../interfaces/repositories/IOrderRepository';
import { OrderDto } from '../../../infra/dto/OrderDto';

@injectable()
export default class OrderFindOneUseCase {
	constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository
	) {}

	async execute(id: string): Promise<OrderDto | null> {
		return this.orderRepository.findById(id);
	}
}
