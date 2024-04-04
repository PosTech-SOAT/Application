import { inject, injectable } from 'tsyringe';
import { CreateCategoryParams, ICategoryRepository } from '../../interfaces/repositories/ICategoryRepository';
import { ICategory } from '../../../infra/entities/CategoryEntity';
import { IBaseUseCase } from '../../interfaces/use-cases/IBaseUseCase';

@injectable()
export default class CategoryCreateUseCase implements IBaseUseCase<CreateCategoryParams, ICategory> {
	constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository
	) {}

	async execute(params: CreateCategoryParams): Promise<ICategory> {

		const category = await this.categoryRepository.create({
			name: params.name,
			description: params.description,
		});

		return category;
	}
}
