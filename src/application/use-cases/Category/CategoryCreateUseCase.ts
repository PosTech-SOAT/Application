import { inject, injectable } from "tsyringe";
import { CreateCategoryParams, ICategoryRepositoryPort } from "../../ports/ICategoryRepositoryPort";
import { ICategory } from "../../../domain/entities/CategoryEntity";

@injectable()
export default class CategoryCreateUseCase {
  constructor(
    @inject("CategoryRepository") 
    private categoryRepository: ICategoryRepositoryPort
  ) {}

  async execute(params: CreateCategoryParams): Promise<ICategory> {
  
    const category = await this.categoryRepository.create({
      name: params.name,
    });
  
    return category;
  }  
}
