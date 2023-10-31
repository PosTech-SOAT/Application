import { inject, injectable } from 'tsyringe';
import { IOrder } from '../../../domain/entities/OrderEntity';
import { OrderStatus } from '../../../adapters/database/typeorm/entities/Order';
import { CreateOrUpdateProductParams, IProductRepositoryPort, UpdateProductParams } from '../../ports/IProductRespositoryPort';
import { ICategoryRepositoryPort } from '../../ports/ICategoryRepositoryPort';


@injectable()
export default class ProductUpdateUseCase {
	constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepositoryPort,
	@inject('CategoryRepository')
	private categoryRepository: ICategoryRepositoryPort
	) {}

	async execute(id: string, body: Partial<UpdateProductParams> ): Promise<void> {
		const { categoryId, ...rest } = body
		const data: Partial<CreateOrUpdateProductParams> = {... rest}
		if (categoryId) {
			const category = await this.categoryRepository.findById(categoryId)
			if (category) {
				data['category'] = category
			}
			else {
				throw new Error("The informed categoryID doesn't exist")
			}
		}
		return this.productRepository.update(id, data);
	}
}
