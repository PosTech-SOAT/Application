import { DataSource, EntityRepository, Repository } from "typeorm";
import { ICreateClientPort } from "../../../../application/ports/ICreateClientPort";
import { IClient } from "../../../../domain/entities/ClientEntity";
import { CreateClientParamsDto } from "../../../../dto/CreateClientParamsDto";
import { Client } from "../entities/Client";
import { DbConnection } from "../../../../infra/database/PostgreSQLConnection";

export class ClientRepository implements ICreateClientPort{
  private connection: typeof DbConnection;

  constructor() {
    this.connection = DbConnection;
  }

  private async getRepo(): Promise<Repository<Client>> {
    if (!this.connection) {
      throw new Error("A conexão não foi estabelecida.");
    }
    
    const con = await this.connection.getConnection();
    
    if (!con) {
      throw new Error("A conexão não foi obtida com sucesso.");
    }

    return con.getRepository(Client);
  }

  async createClient(params: CreateClientParamsDto): Promise<IClient> {
    const repo = await this.getRepo();

    const client = repo.create(params);

    return await repo.save(client);
  }
    
}