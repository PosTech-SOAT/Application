import { inject, injectable } from 'tsyringe';
import { IProductRepositoryPort } from '../../ports/IProductRespositoryPort';
import { IProduct } from '../../../domain/entities/ProductEntity';


@injectable()
export default class ProductFindOneUseCase {
	constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepositoryPort
	) {}

	async execute(id: string): Promise<IProduct | null> {
		return this.productRepository.findById(id);
	}
}
