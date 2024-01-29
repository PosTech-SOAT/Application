import { inject, injectable } from 'tsyringe';
import { IOrderRepository } from '../../interfaces/repositories/IOrderRepository';
import { OrderDto } from '../../../infra/dto/OrderDto';
import { IBaseUseCase } from '../../interfaces/use-cases/IBaseUseCase';

@injectable()
export default class OrderFindOneUseCase implements IBaseUseCase<string, OrderDto | null> {
	constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository
	) {}

	async execute(id: string): Promise<OrderDto | null> {
		return this.orderRepository.findById(id);
	}
}
