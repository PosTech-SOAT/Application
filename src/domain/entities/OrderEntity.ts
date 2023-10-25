import { OrderStatus } from '../../adapters/database/typeorm/entities/Order';
import { IClient } from './ClientEntity';
import { IProduct } from './ProductEntity';

export interface IOrder {
  id: string;
  status: OrderStatus;
	client: IClient;
	products: Array<IProduct>;
}

