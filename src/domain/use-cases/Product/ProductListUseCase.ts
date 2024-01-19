import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../../interfaces/repositories/IProductRespository';
import { IProduct } from '../../../infra/entities/ProductEntity';

@injectable()
export default class ProductListUseCase {
	constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
	) {}

	async execute(): Promise<Array<IProduct>> {
		return (await this.productRepository.list()).map((product) => ({
			id: product.id,
			name: product.name,
			description: product.description,
			price: product.price,
			category: {
				id: product.category.id,
				name: product.category.name,
				description: product.category.description,
			},
		}));
	}
}
