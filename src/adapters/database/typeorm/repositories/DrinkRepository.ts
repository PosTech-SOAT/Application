import { Repository } from "typeorm";
import { DbConnection } from "../../../../infra/database/PostgreSQLConnection";
import { IDrink } from "../../../../domain/entities/DrinkEntity";
import { Drink } from "../entities/Drink";
import { CreateDrinkParams, IDrinkRepositoryPort } from "../../../../application/ports/IDrinkRepositoryPort";


export class DrinkRepository implements IDrinkRepositoryPort {

    private connection: typeof DbConnection;

  constructor() {
    this.connection = DbConnection;
  }

  private async getConnection(): Promise<Repository<Drink>> {
    if (!this.connection) {
      throw new Error("A conexão não foi estabelecida.");
    }
    
    const con = await this.connection.getConnection();
    
    if (!con) {
      throw new Error("A conexão não foi obtida com sucesso.");
    }

    return con.getRepository(Drink);
  }

  async list(): Promise<IDrink[]> {
    const connection = await this.getConnection();

    return connection.find()  
  }
  async findById(id: string): Promise<IDrink | null> {
    const connection = await this.getConnection();

    return connection.findOne({ where: { id}, relations: ['category'] })  
  }
  async delete(id: string){
    const connection = await this.getConnection();
    await connection.createQueryBuilder('Drink')
          .delete()
          .from(Drink)
          .where("id = :id", { id })
          .execute();
    return Promise.resolve()
  }
  async create(params: CreateDrinkParams): Promise<IDrink> {
    const connection = await this.getConnection();
    const client = connection.create(params);

    return connection.save(client);
  }
}