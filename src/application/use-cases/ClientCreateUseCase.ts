import { inject, injectable } from "tsyringe";
import { IClient } from "../../domain/entities/ClientEntity";
import { CreateClientParams, ICreateClientPort } from "../ports/ICreateClientPort";

@injectable()
export default class ClientCreate {
  constructor(
    @inject("ClientRepository")
    private createClientPort: ICreateClientPort) {}

  async execute(params: CreateClientParams): Promise<IClient> {
    const client =  await this.createClientPort.createClient({
      name: params.name,
      email: params.email,
      cpf: params.cpf
    });

    return client;
  }
}