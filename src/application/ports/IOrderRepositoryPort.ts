import { IClient } from '../../domain/entities/ClientEntity';
import { IOrder } from '../../domain/entities/OrderEntity';
import { OrderStatus } from '../../adapters/database/typeorm/entities/Order';
import { IProduct } from '../../domain/entities/ProductEntity';
import { OrderDto } from '../../domain/dto/OrderDto';

export type CreateOrderExecuteParams = {
	status: OrderStatus;
	clientId: string
	productIds: Array<string>;
}

export type CreateOrderParams = {
	status: OrderStatus;
	client: IClient
	products: Array<IProduct>
}

export interface IOrderRepositoryPort {
	list(): Promise<Array<OrderDto>>
	findById(id: string): Promise<OrderDto | null>
	listByStatus(): Promise<Array<IOrder>>
	delete(id: string): Promise<any>
	create(params: CreateOrderParams): Promise<IOrder>
	update(id: string, status: OrderStatus): Promise<any>
}
