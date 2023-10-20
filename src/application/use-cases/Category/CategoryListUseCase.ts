import { inject, injectable } from "tsyringe";
import { ICategoryRepositoryPort } from "../../ports/ICategoryRepositoryPort";
import { ICategory } from "../../../domain/entities/CategoryEntity";

@injectable()
export default class CategoryListUseCase {
  constructor(
    @inject("CategoryRepository") 
    private categoryRepository: ICategoryRepositoryPort
  ) {}

  async execute(): Promise<Array<ICategory>> {
    return (await this.categoryRepository.list()).map((category) => ({
      id: category.id,
      name: category.name,
    }));
  }  
}
