import { inject, injectable } from 'tsyringe';
import { CreateCategoryParams, ICategoryRepository } from '../../interfaces/repositories/ICategoryRepository';
import { ICategory } from '../../../infra/entities/CategoryEntity';

@injectable()
export default class CategoryUpdateUseCase {
	constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository
	) {}

	async execute(id:string, params: CreateCategoryParams): Promise<ICategory> {

		const category = await this.categoryRepository.update(id, {
			...params});

		return category;
	}
}
