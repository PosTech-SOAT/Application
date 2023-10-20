import { inject, injectable } from "tsyringe";
import { IDrink } from "../../../domain/entities/DrinkEntity";
import { IDrinkRepositoryPort } from "../../ports/IDrinkRepositoryPort";


@injectable()
export default class DrinkDeleteUseCase {
  constructor(
    @inject("DrinkRepository") 
    private drinkRepository: IDrinkRepositoryPort
  ) {}

  async execute(id: string): Promise<IDrink> {
    return this.drinkRepository.delete(id);
  }  
}
