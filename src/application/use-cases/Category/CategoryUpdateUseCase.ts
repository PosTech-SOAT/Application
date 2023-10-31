import { inject, injectable } from 'tsyringe';
import { CreateCategoryParams, ICategoryRepositoryPort } from '../../ports/ICategoryRepositoryPort';
import { ICategory } from '../../../domain/entities/CategoryEntity';

@injectable()
export default class CategoryUpdateUseCase {
	constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepositoryPort
	) {}

	async execute(id:string, params: CreateCategoryParams): Promise<ICategory> {

		const category = await this.categoryRepository.update(id, {
			...params});

		return category;
	}
}
