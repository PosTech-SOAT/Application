import { inject, injectable } from 'tsyringe';
import { ICategoryRepository } from '../../interfaces/repositories/ICategoryRepository';
import { ICategory } from '../../../infra/entities/CategoryEntity';

@injectable()
export default class CategoryDeleteUseCase {
	constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository
	) {}

	async execute(id: string): Promise<ICategory> {
		return this.categoryRepository.delete(id);
	}
}
