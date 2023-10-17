import { inject, injectable } from "tsyringe";
import { IClient } from "../../domain/entities/ClientEntity";
import { CreateClientParams, IClientRepositoryPort } from "../ports/IClientRepositoryPort";

@injectable()
export default class ClientListUseCase {
  constructor(
    @inject("ClientRepository") 
    private clientRepository: IClientRepositoryPort
  ) {}

  async execute(): Promise<IClient[]> {
    const clients = await this.clientRepository.list();

    const clientsList = clients.map(client => {
      return {
        id: client.id,
        name: client.name,
        email: client.email,
        cpf: client.cpf
      }
    });

    return clientsList;
  }  
}
