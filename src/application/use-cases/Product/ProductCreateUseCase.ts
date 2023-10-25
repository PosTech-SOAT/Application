import { inject, injectable } from 'tsyringe';
import { CreateProductParams, IProductRepositoryPort } from '../../ports/IProductRespositoryPort';
import { ICategoryRepositoryPort } from '../../ports/ICategoryRepositoryPort';
import { IProduct } from '../../../domain/entities/ProductEntity';
import { CreateProductExecuteParams } from '../../../dto/CreateProductParamsDto';


@injectable()
export default class ProductCreateUseCase {
	constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepositoryPort,
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepositoryPort,
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
		} as CreateProductParams);

		return product;
	}
}
