import { inject, injectable } from 'tsyringe';
import { CreateCategoryParams, ICategoryRepository } from '../../interfaces/repositories/ICategoryRepository';
import { ICategory } from '../../../infra/entities/CategoryEntity';
import { IBaseUseCase } from '../../interfaces/use-cases/IBaseUseCase';

type CategoryUpdateParams = {
	id: string;
	params: CreateCategoryParams;
};

@injectable()
export default class CategoryUpdateUseCase implements IBaseUseCase<CategoryUpdateParams, ICategory> {
	constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository
	) {}

	async execute({id, params}: CategoryUpdateParams): Promise<ICategory> {

		const category = await this.categoryRepository.update(id, {
			...params});

		return category;
	}
}
