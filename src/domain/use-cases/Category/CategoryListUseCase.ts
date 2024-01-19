import { inject, injectable } from 'tsyringe';
import { ICategoryRepository } from '../../interfaces/repositories/ICategoryRepository';
import { ICategory } from '../../../infra/entities/CategoryEntity';

@injectable()
export default class CategoryListUseCase {
	constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository
	) {}

	async execute(): Promise<Array<ICategory>> {
		return (await this.categoryRepository.list()).map((category) => ({
			id: category.id,
			name: category.name,
			description: category.description,
		}));
	}
}
