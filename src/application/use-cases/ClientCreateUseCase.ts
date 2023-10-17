import { inject, injectable } from "tsyringe";
import { IClient } from "../../domain/entities/ClientEntity";
import { CreateClientParams, IClientRepositoryPort } from "../ports/IClientRepositoryPort";

@injectable()
export default class ClientCreateUseCase {
  constructor(
    @inject("ClientRepository") 
    private clientRepository: IClientRepositoryPort
  ) {}

  async execute(params: CreateClientParams): Promise<IClient> {
    const existingClient = await this.clientRepository.findByCPF(params.cpf);
  
    if (existingClient) {
      throw new Error("CPF already exists in the database");
    }
  
    const client = await this.clientRepository.createClient({
      name: params.name,
      email: params.email,
      cpf: params.cpf
    });
  
    return client;
  }  
}
