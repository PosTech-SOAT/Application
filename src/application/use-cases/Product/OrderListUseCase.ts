import { inject, injectable } from 'tsyringe';
import { IOrderRepositoryPort } from '../../ports/IOrderRepositoryPort';
import { IOrder } from '../../../domain/entities/OrderEntity';


@injectable()
export default class OrderListUseCase {
	constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepositoryPort
	) {}

	async execute(): Promise<Array<IOrder>> {
		return (await this.orderRepository.list()).map((order) => ({
			id: order.id,
			products: order.products,
			client: order.client,
			status: order.status,
		}));
	}
}
