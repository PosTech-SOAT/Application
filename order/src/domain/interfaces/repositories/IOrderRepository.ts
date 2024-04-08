import { OrderDto } from '../../../infra/dto/OrderDto';
import { IClient } from '../../../infra/entities/ClientEntity';
import { IOrder } from '../../../infra/entities/OrderEntity';
import { IProduct } from '../../../infra/entities/ProductEntity';
import { OrderStatus } from '../../entities/Order';

export type CreateOrderExecuteParams = {
	status: OrderStatus;
	clientId: string
	productIds: Array<string>;
}

export type CreateOrderParams = {
	status: OrderStatus;
	clientId: string;
	productIds: Array<string>;
}
export interface IOrderRepository {
	list(): Promise<Array<OrderDto>>
	findById(id: string): Promise<OrderDto | null>
	listByStatus(): Promise<Array<IOrder>>
	delete(id: string): Promise<any>
	create(params: CreateOrderParams): Promise<IOrder>
	update(id: string, status: OrderStatus): Promise<any>
}
