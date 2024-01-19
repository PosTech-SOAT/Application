import { inject, injectable } from 'tsyringe';
import { CreateOrUpdateProductParams, IProductRepository, UpdateProductParams } from '../../interfaces/repositories/IProductRespository';
import { ICategoryRepository } from '../../interfaces/repositories/ICategoryRepository';

@injectable()
export default class ProductUpdateUseCase {
	constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
	@inject('CategoryRepository')
	private categoryRepository: ICategoryRepository
	) {}

	async execute(id: string, body: Partial<UpdateProductParams> ): Promise<void> {
		const { categoryId, ...rest } = body;
		const data: Partial<CreateOrUpdateProductParams> = {... rest};
		if (categoryId) {
			const category = await this.categoryRepository.findById(categoryId);
			if (category) {
				data['category'] = category;
			}
			else {
				throw new Error('The informed categoryID doesn\'t exist');
			}
		}
		return this.productRepository.update(id, data);
	}
}
