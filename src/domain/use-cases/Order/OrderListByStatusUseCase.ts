import { inject, injectable } from 'tsyringe';
import { IOrderRepository } from '../../interfaces/repositories/IOrderRepository';
import { GroupedOrdersByStatus } from '../../../infra/dto/OrderDto';
import { mapOrderToOrderDto } from '../../../infra/mappers/MapOrderToOrderDto';
import { IBaseUseCase } from '../../interfaces/use-cases/IBaseUseCase';

@injectable()
export default class OrderListByStatusUseCase implements IBaseUseCase<void, GroupedOrdersByStatus> {
	constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository
	) {}

	async execute(): Promise<GroupedOrdersByStatus> {
		return (await this.orderRepository.listByStatus()).reduce((orders, currentOrder) => {
			if (!orders[currentOrder.status]) {
				orders[currentOrder.status] = [mapOrderToOrderDto(currentOrder)];
			} else {
				orders[currentOrder.status].push(mapOrderToOrderDto(currentOrder));
			}
			return orders;
		}, {} as GroupedOrdersByStatus);
	}
}
