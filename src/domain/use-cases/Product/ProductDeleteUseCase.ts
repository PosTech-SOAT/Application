import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../../interfaces/repositories/IProductRespository';

@injectable()
export default class ProductDeleteUseCase {
	constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
	) {}

	async execute(id: string): Promise<void> {
		return this.productRepository.delete(id);
	}
}
