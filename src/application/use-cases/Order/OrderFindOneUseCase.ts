import { inject, injectable } from "tsyringe";
import { IOrderRepositoryPort } from "../../ports/IOrderRepositoryPort";
import { OrderDto } from "../../../dto/OrderDto";


@injectable()
export default class OrderFindOneUseCase {
  constructor(
    @inject("OrderRepository") 
    private orderRepository: IOrderRepositoryPort
  ) {}

  async execute(id: string): Promise<OrderDto | null> {
    return this.orderRepository.findById(id);
  }  
}
