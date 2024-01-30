import { inject, injectable } from 'tsyringe';
import { ICategoryRepository } from '../../interfaces/repositories/ICategoryRepository';
import { ICategory } from '../../../infra/entities/CategoryEntity';
import { IBaseUseCase } from '../../interfaces/use-cases/IBaseUseCase';

@injectable()
export default class CategoryFindOneUseCase implements IBaseUseCase<string, ICategory | null>{
	constructor(
		@inject('CategoryRepository')
		private categoryRepository: ICategoryRepository
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
