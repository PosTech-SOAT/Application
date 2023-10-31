import { inject, injectable } from 'tsyringe';
import { ICategoryRepositoryPort } from '../../ports/ICategoryRepositoryPort';
import { ICategory } from '../../../domain/entities/CategoryEntity';

@injectable()
export default class CategoryFindOneUseCase {
	constructor(
		@inject('CategoryRepository')
		private categoryRepository: ICategoryRepositoryPort
	) {}

	async execute(id: string): Promise<ICategory | null> {
		const category = await this.categoryRepository.findById(id);

		if (!category) {
			return null;
		}

		const CategoryData = {
			id: category.id,
			name: category.name,
			description: category.description,
		};

		return CategoryData;
	}
}
