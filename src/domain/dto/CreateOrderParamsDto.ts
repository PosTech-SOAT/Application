import { IOrder } from '../entities/OrderEntity';
import { IClient } from '../entities/ClientEntity';

export interface CreateOrderParamsDto extends Omit<IOrder, 'id' | 'status'> {
	name: string,
	description: string,
	client: IClient,
}
