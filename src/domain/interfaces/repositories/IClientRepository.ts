import { IClient } from '../../../infra/entities/ClientEntity';

export type CreateClientParams = {
  name: string;
  email: string;
  cpf: string;
}

export interface IClientRepository {
  createClient(params: CreateClientParams): Promise<IClient>;
	findById(id: string): Promise<IClient | null>;
  findByCPF(cpf: string): Promise<IClient | null>;
  list(): Promise<IClient[]>;
  update(cpf: string, params: CreateClientParams): Promise<any>;
}
