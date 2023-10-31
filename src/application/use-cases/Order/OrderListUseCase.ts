import { inject, injectable } from 'tsyringe';
import { IOrderRepositoryPort } from '../../ports/IOrderRepositoryPort';
import { IOrder } from '../../../domain/entities/OrderEntity';
import { OrderDto } from '../../../domain/dto/OrderDto';
import { IClient } from '../../../domain/entities/ClientEntity';
import { IProduct } from '../../../domain/entities/ProductEntity';


@injectable()
export default class OrderListUseCase {
	constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepositoryPort
	) {}

	async execute(): Promise<Array<OrderDto>> {
		return (await this.orderRepository.list()).map((order) => ({
			id: order.id,
			products: order.products.map(({id, name, description, price}) => ({id, name, description, price}) as IProduct),
			client: {
				id: order.client.id,
				name: order.client.name,
			} as IClient,
			status: order.status,
			price: order.price,

		}));
	}
}
