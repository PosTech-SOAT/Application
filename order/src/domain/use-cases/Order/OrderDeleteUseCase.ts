import { inject, injectable } from 'tsyringe';
import { IOrderRepository } from '../../interfaces/repositories/IOrderRepository';
import { IOrder } from '../../../infra/entities/OrderEntity';
import { IBaseUseCase } from '../../interfaces/use-cases/IBaseUseCase';

@injectable()
export default class OrderDeleteUseCase implements IBaseUseCase<string, IOrder> {
	constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository
	) {}

	async execute(id: string): Promise<IOrder> {
		return this.orderRepository.delete(id);
	}
}
