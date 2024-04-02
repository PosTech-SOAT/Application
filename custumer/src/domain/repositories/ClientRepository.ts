// ClientRepository.ts
import { ClientModel, IClient } from '../entities/Client';
import { CreateClientParams, IClientRepository } from '../interfaces/repositories/IClientRepository';

export class ClientRepository implements IClientRepository {
  async createClient(params: CreateClientParams): Promise<IClient> {
    const client = new ClientModel(params);
    return client.save();
  }

  async findByCPF(cpf: string): Promise<IClient | null> {
    return ClientModel.findOne({ cpf }).exec();
  }

  async findById(id: string): Promise<IClient | null> {
    return ClientModel.findById(id).exec();
  }

  async list(): Promise<IClient[]> {
    return ClientModel.find().exec();
  }

  async update(cpf: string, data: CreateClientParams): Promise<void> {
    await ClientModel.findOneAndUpdate({ cpf }, data).exec();
  }
}
