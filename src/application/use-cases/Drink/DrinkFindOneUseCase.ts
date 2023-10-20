import { inject, injectable } from "tsyringe";
import { IDrink } from "../../../domain/entities/DrinkEntity";
import { IDrinkRepositoryPort } from "../../ports/IDrinkRepositoryPort";


@injectable()
export default class DrinkFindOneUseCase {
  constructor(
    @inject("AccompanimentRepository") 
    private drinkRepository: IDrinkRepositoryPort
  ) {}

  async execute(id: string): Promise<IDrink | null> {
    return this.drinkRepository.findById(id);
  }  
}
