import { OrderDto } from '../dto/OrderDto';
import { IClient } from '../entities/ClientEntity';
import { IProduct } from '../entities/ProductEntity';
import { IOrder } from '../entities/OrderEntity';

export function mapOrderToOrderDto(order: IOrder, client: IClient): OrderDto {
	const { products, id, status } = order;
	const normalizedProducts = products.map(({product}) => product);
	return {
		id,
		status,
		client,
		products: normalizedProducts.map(({id,name, description, price}) => ({ id, name, description, price }) as IProduct),
		price: normalizedProducts.reduce((price, currentProduct) => {
			price += currentProduct.price;
			return price;
		}, 0)
	};
}
