import { Repository } from "typeorm";
import { DbConnection } from "../../../../infra/database/PostgreSQLConnection";
import { CreateAccompanimentParams, IAccompanimentRepositoryPort } from "../../../../application/ports/IAccompanimentRepositoryPort";
import { IAccompaniment } from "../../../../domain/entities/AccompanimentEntity";
import { Accompaniment } from "../entities/Accompaniment";


export class AccompanimentRepository implements IAccompanimentRepositoryPort {

    private connection: typeof DbConnection;

  constructor() {
    this.connection = DbConnection;
  }

  private async getConnection(): Promise<Repository<Accompaniment>> {
    if (!this.connection) {
      throw new Error("A conexão não foi estabelecida.");
    }
    
    const con = await this.connection.getConnection();
    
    if (!con) {
      throw new Error("A conexão não foi obtida com sucesso.");
    }

    return con.getRepository(Accompaniment);
  }

  async list(): Promise<IAccompaniment[]> {
    const connection = await this.getConnection();

    return connection.find()  
  }
  async findById(id: string): Promise<IAccompaniment | null> {
    const connection = await this.getConnection();

    return connection.findOneOrFail({ where: { id }, relations: ['category'] })  
  }
  async delete(id: string){
    const connection = await this.getConnection();
    await connection.createQueryBuilder('Accompaniment')
          .delete()
          .from(Accompaniment)
          .where("id = :id", { id })
          .execute();
    return Promise.resolve()
  }
  async create(params: CreateAccompanimentParams): Promise<IAccompaniment> {
    const connection = await this.getConnection();
    const client = connection.create(params);

    return connection.save(client);
  }
}