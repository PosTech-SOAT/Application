import { IClient } from "../../domain/entities/ClientEntity";

export type CreateClientParams = {
  id: string;
  name: string;
  email: string;
  cpf: string;
}

export interface ICreateClientPort {
  createClient(params: CreateClientParams): Promise<IClient>;
}