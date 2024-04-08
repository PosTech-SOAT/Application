import { OrderStatus } from '../../domain/entities/Order';
import { IClient } from './ClientEntity';
import { IOrdersProducts } from './OrdersProductsEntity';

export interface IOrder {
	id: string;
	status: OrderStatus;
	client?: IClient;
	products: Array<IOrdersProducts>;
}
