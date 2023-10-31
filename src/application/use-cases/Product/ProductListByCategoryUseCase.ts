import { inject, injectable } from 'tsyringe';
import { IProductRepositoryPort } from '../../ports/IProductRespositoryPort';
import { IProduct } from '../../../domain/entities/ProductEntity';


@injectable()
export default class ProductListByCategoryUseCase {
	constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepositoryPort
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
