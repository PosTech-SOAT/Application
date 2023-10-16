import { IClient } from "../../domain/entities/ClientEntity";

export type CreateClientParams = {
  name: string;
  email: string;
  cpf: string;
}

export interface ICreateClientPort {
  createClient(params: CreateClientParams): Promise<IClient>;
}