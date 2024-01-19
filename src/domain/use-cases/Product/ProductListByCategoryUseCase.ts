import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../../interfaces/repositories/IProductRespository';
import { IProduct } from '../../../infra/entities/ProductEntity';

@injectable()
export default class ProductListByCategoryUseCase {
	constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
	) {}

	async execute(id: string): Promise<IProduct[] | null> {
		const produts = await this.productRepository.findByCategory(id);

		const productsData = produts?.map(product => {
			return {
				id: product.id,
				name: product.name,
				description: product.description,
				price: product.price,
				category: {
					id: product.category.id,
					name: product.category.name,
				},
			};
		});

		return productsData ?? null;
	}
}
