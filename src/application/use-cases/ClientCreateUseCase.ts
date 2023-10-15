import { IClient } from "../../domain/entities/ClientEntity";
import { CreateClientParams, ICreateClientPort } from "../ports/ICreateClientPort";

export default class ClientCreate {
  constructor(private readonly createClientPort: ICreateClientPort) {}

  async execute(params: CreateClientParams): Promise<IClient> {
    return await this.createClientPort.createClient(params);
  }
}