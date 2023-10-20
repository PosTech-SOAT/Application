import { inject, injectable } from "tsyringe";
import { ICategoryRepositoryPort } from "../../ports/ICategoryRepositoryPort";
import { IDrink } from "../../../domain/entities/DrinkEntity";
import { CreateDrinkExecuteParams, IDrinkRepositoryPort } from "../../ports/IDrinkRepositoryPort";

@injectable()
export default class DrinkCreateUseCase {
  constructor(
    @inject("DrinkRepository") 
    private drinkRepository: IDrinkRepositoryPort,
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepositoryPort,
  ) {}

  async execute(params: CreateDrinkExecuteParams): Promise<IDrink> {
    const {categoryId, ...rest} = params
    const category = await this.categoryRepository.findById(categoryId)

    if (!category) {
      throw new Error("The selected drink's category doesn't exist")
    }

    const drink = await this.drinkRepository.create({
      ...rest,
      category,
    });
  
    return drink;
  }  
}
