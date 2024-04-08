import { inject, injectable } from 'tsyringe';
import { CreateOrderExecuteParams, IOrderRepository } from '../../interfaces/repositories/IOrderRepository';
import { IProductRepository } from '../../interfaces/repositories/IProductRespository';
import { IOrder } from '../../../infra/entities/OrderEntity';
import { mapProductsToRealQuantity } from '../../../infra/mappers/MapProductsToRealQuantity';
import { IBaseUseCase } from '../../interfaces/use-cases/IBaseUseCase';

@injectable()
export default class OrderCreateUseCase implements IBaseUseCase<CreateOrderExecuteParams, IOrder> {
	constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
        @inject('ProductRepository')
        private productRepository: IProductRepository
	) {}

	async execute(params: CreateOrderExecuteParams): Promise<IOrder> {
		const {clientId, productIds, ...rest} = params;

		const products = mapProductsToRealQuantity(await this.productRepository.list(productIds), productIds);

		if (!products.length) {
			throw new Error('The order is incomplete. You must select either a drink, accompaniment or snack');
		}

		const order = await this.orderRepository.create({
			...rest,
			clientId,
			productIds
		});

		return order;
	}
}
