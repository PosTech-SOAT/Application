import { inject, injectable } from 'tsyringe';
import { CreateOrUpdateProductParams, IProductRepository } from '../../interfaces/repositories/IProductRespository';
import { ICategoryRepository } from '../../interfaces/repositories/ICategoryRepository';
import { CreateProductExecuteParams } from '../../../infra/dto/CreateProductParamsDto';
import { IProduct } from '../../../infra/entities/ProductEntity';

@injectable()
export default class ProductCreateUseCase {
	constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
	) {}

	async execute(params: CreateProductExecuteParams): Promise<IProduct> {
		const {categoryId, ...rest} = params;

		const category = await this.categoryRepository.findById(categoryId);

		if (!category) {
			throw new Error('A category must be informed');
		}

		const product = await this.productRepository.create({
			...rest,
			category,
		} as CreateOrUpdateProductParams);

		return product;
	}
}
