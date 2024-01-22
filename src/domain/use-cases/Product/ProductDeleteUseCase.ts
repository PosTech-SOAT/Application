import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../../interfaces/repositories/IProductRespository';
import { IBaseUseCase } from '../../interfaces/use-cases/IBaseUseCase';

@injectable()
export default class ProductDeleteUseCase implements IBaseUseCase<string, void> {
	constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
	) {}

	async execute(id: string): Promise<void> {
		return this.productRepository.delete(id);
	}
}
