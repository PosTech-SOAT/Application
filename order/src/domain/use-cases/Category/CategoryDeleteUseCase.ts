import { inject, injectable } from 'tsyringe';
import { ICategoryRepository } from '../../interfaces/repositories/ICategoryRepository';
import { ICategory } from '../../../infra/entities/CategoryEntity';
import { IBaseUseCase } from '../../interfaces/use-cases/IBaseUseCase';

@injectable()
export default class CategoryDeleteUseCase implements IBaseUseCase<string, any>{
	constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository
	) {}

	async execute(id: string): Promise<ICategory> {
		return this.categoryRepository.delete(id);
	}
}
