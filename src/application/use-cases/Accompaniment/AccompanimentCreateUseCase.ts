import { inject, injectable } from "tsyringe";
import { ICategoryRepositoryPort } from "../../ports/ICategoryRepositoryPort";
import { ICategory } from "../../../domain/entities/CategoryEntity";
import { CreateAccompanimentExecuteParams, IAccompanimentRepositoryPort } from "../../ports/IAccompanimentRepositoryPort";

@injectable()
export default class AccompanimentCreateUseCase {
  constructor(
    @inject("AccompanimentRepository") 
    private accompanimentRepository: IAccompanimentRepositoryPort,
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepositoryPort,
  ) {}

  async execute(params: CreateAccompanimentExecuteParams): Promise<ICategory> {
    const {categoryId, ...rest} = params
    const category = await this.categoryRepository.findById(categoryId)

    if (!category) {
      throw new Error("The selected accompaniment's category doesn't exist")
    }

    const client = await this.accompanimentRepository.create({
      ...rest,
      category,
    });
  
    return client;
  }  
}
