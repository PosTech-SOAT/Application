import { Repository } from "typeorm";
import { DbConnection } from "../../../../infra/database/PostgreSQLConnection";
import { CreateOrderParams, IOrderRepositoryPort } from "../../../../application/ports/IOrderRepositoryPort";
import { IOrder } from "../../../../domain/entities/OrderEntity";
import { Order } from "../entities/Order";

export class OrderRepository implements IOrderRepositoryPort {

    private connection: typeof DbConnection;

  constructor() {
    this.connection = DbConnection;
  }

  private async getConnection(): Promise<Repository<Order>> {
    if (!this.connection) {
      throw new Error("A conexão não foi estabelecida.");
    }
    
    const con = await this.connection.getConnection();
    
    if (!con) {
      throw new Error("A conexão não foi obtida com sucesso.");
    }

    return con.getRepository(Order);
  }

  async list(): Promise<IOrder[]> {
    const connection = await this.getConnection();

    return connection.find({relations: ['drink', 'snack', 'accompaniment']})  
  }
  async findById(id: string): Promise<IOrder | null> {
    const connection = await this.getConnection();

    return connection.findOne({ where: { id}, relations: ['drink', 'snack', 'accompaniment' ] })  
  }
  async delete(id: string){
    const connection = await this.getConnection();
    await connection.createQueryBuilder('Order')
          .delete()
          .from(Order)
          .where("id = :id", { id })
          .execute();
    return Promise.resolve()
  }
  async create(params: CreateOrderParams): Promise<IOrder> {
    const connection = await this.getConnection();
    const client = connection.create(params);

    return connection.save(client);
  }
}