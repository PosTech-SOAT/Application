import { IOrder } from '../entities/OrderEntity';
import { IProduct } from '../entities/ProductEntity';

export interface OrderDto extends Omit<IOrder, 'products'> {
	products: Array<IProduct>;
	price: number;
}
