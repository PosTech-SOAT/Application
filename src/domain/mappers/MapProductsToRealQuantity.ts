import { IProduct } from '../entities/ProductEntity';

export function mapProductsToRealQuantity(products: Array<IProduct>, productIds: Array<string>, ) {
	const productsQuantity = productIds.reduce((productsMap, current) => {
		if (!productsMap[current]) {
			productsMap[current] = 1;
		}
		else {
			productsMap[current] += 1;
		}
		return productsMap;
	}, {} as Record<string, number>);

	return products.reduce((productsMap, current) => {
		productsMap.push(...new Array(productsQuantity[current.id]).fill(current));
		return productsMap;
	}, [] as Array<IProduct>);
}
