import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../../interfaces/repositories/IProductRespository';
import { IProduct } from '../../../infra/entities/ProductEntity';
import { IBaseUseCase } from '../../interfaces/use-cases/IBaseUseCase';

@injectable()
export default class ProductFindOneUseCase implements IBaseUseCase<string, IProduct | null> {
	constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
	) {}

	async execute(id: string): Promise<IProduct | null> {
		const product = await this.productRepository.findById(id);

		return product ? {
			id: product.id,
			name: product.name,
			description: product.description,
			price: product.price,
			category: {
				id: product.category.id,
				name: product.category.name,
			},
		} : null;
	}
}
