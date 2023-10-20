import { inject, injectable } from "tsyringe";
import { IAccompanimentRepositoryPort } from "../../ports/IAccompanimentRepositoryPort";
import { IAccompaniment } from "../../../domain/entities/AccompanimentEntity";

@injectable()
export default class AccompanimentListUseCase {
  constructor(
    @inject("AccompanimentRepository") 
    private accompanimentRepository: IAccompanimentRepositoryPort
  ) {}

  async execute(): Promise<Array<IAccompaniment>> {
    return (await this.accompanimentRepository.list()).map((accompaniment) => ({
      id: accompaniment.id,
      name: accompaniment.name,
      description: accompaniment.description,
      price: accompaniment.price,
      category: accompaniment.category,
    }));
  }  
}
