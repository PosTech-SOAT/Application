import { Repository } from "typeorm";
import { ICreateClientPort } from "../../../../application/ports/ICreateClientPort";
import { IClient } from "../../../../domain/entities/ClientEntity";
import { CreateClientParamsDto } from "../../../../dto/CreateClientParamsDto";
import DbConnection from "../../../../infra/database/PostgreSQLConnection";
import { Client } from "../entities/Client";

export class ClientRepository implements ICreateClientPort{
  private connection: typeof DbConnection;

  constructor() {
    this.connection = DbConnection;
  }

  private async getRepository(): Promise<Repository<Client>> {
    const con: any = await this.connection.getConnection();

    return con.getRepository(Client);
  }

  async createClient(client: CreateClientParamsDto): Promise<IClient> {
    const repo = await this.getRepository();

    const newClient = repo.create(client);

    return await repo.save(newClient);
  }
    
}