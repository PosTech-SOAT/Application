import { inject, injectable } from 'tsyringe';
import { IOrderRepositoryPort } from '../../ports/IOrderRepositoryPort';
import { IOrder } from '../../../domain/entities/OrderEntity';
import { GroupedOrdersByStatus, OrderDto } from '../../../domain/dto/OrderDto';
import { IClient } from '../../../domain/entities/ClientEntity';
import { IProduct } from '../../../domain/entities/ProductEntity';
import { mapOrderToOrderDto } from '../../../domain/mappers/MapOrderToOrderDto';


@injectable()
export default class OrderListByStatusUseCase {
	constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepositoryPort
	) {}

	async execute(): Promise<GroupedOrdersByStatus> {
		return (await this.orderRepository.listByStatus()).reduce((orders, currentOrder) => {
			if (!orders[currentOrder.status]) {
				orders[currentOrder.status] = [mapOrderToOrderDto(currentOrder)]
			} else {
				orders[currentOrder.status].push(mapOrderToOrderDto(currentOrder))
			}
			return orders;
		}, {} as GroupedOrdersByStatus)
	}
}
