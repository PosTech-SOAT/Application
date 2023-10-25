import { IOrder } from '../domain/entities/OrderEntity';
import { IClient } from '../domain/entities/ClientEntity';

export interface CreateOrderParamsDto extends Omit<IOrder, 'id' | 'status'> {
	name: string,
	description: string,
	client: IClient,
}
