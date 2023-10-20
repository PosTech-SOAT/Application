import { inject, injectable } from "tsyringe";
import { IAccompanimentRepositoryPort } from "../../ports/IAccompanimentRepositoryPort";
import { IAccompaniment } from "../../../domain/entities/AccompanimentEntity";

@injectable()
export default class AccompanimentDeleteUseCase {
  constructor(
    @inject("AccompanimentRepository") 
    private accompanimentRepository: IAccompanimentRepositoryPort
  ) {}

  async execute(id: string): Promise<IAccompaniment> {
    return this.accompanimentRepository.delete(id);
  }  
}
