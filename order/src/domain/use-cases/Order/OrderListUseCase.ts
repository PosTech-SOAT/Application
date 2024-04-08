import { inject, injectable } from 'tsyringe';
import { IOrderRepository } from '../../interfaces/repositories/IOrderRepository';
import { OrderDto } from '../../../infra/dto/OrderDto';
import { IProduct } from '../../../infra/entities/ProductEntity';
import { IClient } from '../../../infra/entities/ClientEntity';
import { IBaseUseCase } from '../../interfaces/use-cases/IBaseUseCase';

@injectable()
export default class OrderListUseCase implements IBaseUseCase<void, Array<OrderDto>> {
	constructor(
        @inject('OrderRepository')
        private orderRepository: IOrderRepository
	) {}

	async execute(): Promise<Array<OrderDto>> {
		const orders = await this.orderRepository.list();

		return orders.map((order) => ({
			id: order.id,
			products: order.products.map(({id, name, description, price}) => ({id, name, description, price}) as IProduct),
			client: order.client ? {
				id: order.client.id,
				name: order.client.name,
			} as IClient : undefined,
			status: order.status,
			price: order.price,
		}));
	}
}
