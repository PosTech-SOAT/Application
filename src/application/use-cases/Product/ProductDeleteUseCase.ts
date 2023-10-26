import { inject, injectable } from 'tsyringe';
import { IOrder } from '../../../domain/entities/OrderEntity';
import { IProductRepositoryPort } from '../../ports/IProductRespositoryPort';


@injectable()
export default class ProductDeleteUseCase {
	constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepositoryPort
	) {}

	async execute(id: string): Promise<void> {
		return this.productRepository.delete(id);
	}
}
