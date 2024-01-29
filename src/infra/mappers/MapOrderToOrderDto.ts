import { OrderDto } from '../dto/OrderDto';
import { IClient } from '../entities/ClientEntity';
import { IOrder } from '../entities/OrderEntity';
import { IProduct } from '../entities/ProductEntity';

export function mapOrderToOrderDto(order: IOrder): OrderDto {
	const { products, id, status, client } = order;
	const normalizedProducts = products.map(({product}) => product);
	return {
		id,
		status,
		client: {
			id: client.id,
			name: client.name,
		} as IClient,
		products: normalizedProducts.map(({id,name, description, price}) => ({ id, name, description, price }) as IProduct),
		price: normalizedProducts.reduce((price, currentProduct) => {
			price += currentProduct.price;
			return price;
		}, 0)
	};
}
