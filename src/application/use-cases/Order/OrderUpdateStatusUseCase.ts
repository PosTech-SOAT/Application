import { inject, injectable } from "tsyringe";
import { IOrderRepositoryPort } from "../../ports/IOrderRepositoryPort";
import { IOrder } from "../../../domain/entities/OrderEntity";
import { OrderStatus } from "../../../adapters/database/typeorm/entities/Order";


@injectable()
export default class OrderUpdateStatusUseCase {
  constructor(
    @inject("OrderRepository") 
    private orderRepository: IOrderRepositoryPort
  ) {}

  async execute(id: string, status: OrderStatus): Promise<IOrder | null> {
    return this.orderRepository.update(id, status);
  }  
}
