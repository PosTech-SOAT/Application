import { inject, injectable } from "tsyringe";
import { IClient } from "../../../domain/entities/ClientEntity";
import { CreateCategoryParams, ICategoryRepositoryPort } from "../../ports/ICategoryRepositoryPort";
import { ICategory } from "../../../domain/entities/CategoryEntity";

@injectable()
export default class CategoryFindOneUseCase {
  constructor(
    @inject("CategoryRepository") 
    private categoryRepository: ICategoryRepositoryPort
  ) {}

  async execute(id: string): Promise<ICategory | null> {
    return this.categoryRepository.findById(id);
  }  
}
