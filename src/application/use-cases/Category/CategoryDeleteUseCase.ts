import { inject, injectable } from "tsyringe";
import { IClient } from "../../../domain/entities/ClientEntity";
import { CreateCategoryParams, ICategoryRepositoryPort } from "../../ports/ICategoryRepositoryPort";
import { ICategory } from "../../../domain/entities/CategoryEntity";

@injectable()
export default class CategoryDeleteUseCase {
  constructor(
    @inject("CategoryRepository") 
    private categoryRepository: ICategoryRepositoryPort
  ) {}

  async execute(id: string): Promise<ICategory> {
    return this.categoryRepository.delete(id);
  }  
}
