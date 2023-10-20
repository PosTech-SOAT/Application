import { inject, injectable } from "tsyringe";
import { IDrink } from "../../../domain/entities/DrinkEntity";
import { IDrinkRepositoryPort } from "../../ports/IDrinkRepositoryPort";


@injectable()
export default class DrinkFindOneUseCase {
  constructor(
    @inject("DrinkRepository") 
    private drinkRepository: IDrinkRepositoryPort
  ) {}

  async execute(id: string): Promise<IDrink | null> {
    return this.drinkRepository.findById(id);
  }  
}
