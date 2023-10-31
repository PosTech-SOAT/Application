import { OrderDto } from '../dto/OrderDto';
import { IOrder } from '../entities/OrderEntity';

export function mapOrderToOrderDto(order: IOrder): OrderDto {
	const { products, ...rest } = order;
	const normalizedProducts = products.map(({product}) => product);
	return {
		...rest,
		products: normalizedProducts,
		price: normalizedProducts.reduce((price, currentProduct) => {
			price += currentProduct.price;
			return price;
		}, 0)
	};
}
