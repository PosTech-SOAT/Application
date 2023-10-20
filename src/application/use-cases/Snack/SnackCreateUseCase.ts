import { inject, injectable } from 'tsyringe';
import { ICategoryRepositoryPort } from '../../ports/ICategoryRepositoryPort';
import { ICategory } from '../../../domain/entities/CategoryEntity';
import { CreateSnackExecuteParams, ISnackRepositoryPort } from '../../ports/ISnackRepositoryPort';

@injectable()
export default class SnackCreateUseCase {
	constructor(
    @inject('SnackRepository')
    private snackRepository: ISnackRepositoryPort,
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepositoryPort,
	) {}

  async execute(params: CreateSnackExecuteParams): Promise<ICategory> {
    const {categoryId, ...rest} = params;
    const category = await this.categoryRepository.findById(categoryId)
    if (!category) {
      throw new Error("The product's category doesn't exist")
    }
    const snack = await this.snackRepository.create({
      ...rest,
      category,
    });
  
    return snack;
  }  
}
