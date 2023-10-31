import { inject, injectable } from 'tsyringe';
import { CreateOrderExecuteParams, CreateOrderParams, IOrderRepositoryPort } from '../../ports/IOrderRepositoryPort';
import { IOrder } from '../../../domain/entities/OrderEntity';
import { IClientRepositoryPort } from '../../ports/IClientRepositoryPort';
import { IProductRepositoryPort } from '../../ports/IProductRespositoryPort';
import { IProduct } from '../../../domain/entities/ProductEntity';
import { IOrdersProducts } from '../../../domain/entities/OrdersProductsEntity';
import { mapProductsToRealQuantity } from '../../../domain/mappers/MapProductsToRealQuantity';


@injectable()
export default class OrderCreateUseCase {
	constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepositoryPort,
    @inject('ClientRepository')
    private clientRepository: IClientRepositoryPort,
		@inject('ProductRepository')
		private productRepository: IProductRepositoryPort
	) {}

	async execute(params: CreateOrderExecuteParams): Promise<IOrder> {
		const {clientId, productIds, ...rest} = params;

		const products = mapProductsToRealQuantity(await this.productRepository.list(productIds), productIds);

		const client = await this.clientRepository.findById(clientId);

		if (!products.length) {
			throw new Error('The order is incomplete. You must select either a drink, accompaniment or snack');
		}

		if (!client) {
			throw new Error('A client must be informed');
		}

		const order = await this.orderRepository.create({
			...rest,
			client,
			products
		} as CreateOrderParams);

		return order;
	}
}
