import { inject, injectable } from "tsyringe";
import { IDrink } from "../../../domain/entities/DrinkEntity";
import { IDrinkRepositoryPort } from "../../ports/IDrinkRepositoryPort";


@injectable()
export default class DrinkListUseCase {
  constructor(
    @inject("DrinkRepository") 
    private drinkRepository: IDrinkRepositoryPort
  ) {}

  async execute(): Promise<Array<IDrink>> {
    return (await this.drinkRepository.list()).map((drink) => ({
      id: drink.id,
      name: drink.name,
      description: drink.description,
      price: drink.price,
      category: drink.category,
    }));
  }  
}
