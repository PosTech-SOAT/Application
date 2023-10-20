import { IClient } from "../../domain/entities/ClientEntity";

export type CreateClientParams = {
  name: string;
  email: string;
  cpf: string;
}

export interface IClientRepositoryPort {
  createClient(params: CreateClientParams): Promise<IClient>;
  findByCPF(cpf: string): Promise<IClient | null>;
  findById(id: string): Promise<IClient | null>;
  list(): Promise<IClient[]>;
}