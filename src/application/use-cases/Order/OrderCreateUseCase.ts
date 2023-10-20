import { inject, injectable } from "tsyringe";
import { CreateOrderExecuteParams, IOrderRepositoryPort } from "../../ports/IOrderRepositoryPort";
import { IDrinkRepositoryPort } from "../../ports/IDrinkRepositoryPort";
import { ISnackRepositoryPort } from "../../ports/ISnackRepositoryPort";
import { IAccompanimentRepositoryPort } from "../../ports/IAccompanimentRepositoryPort";
import { IOrder } from "../../../domain/entities/OrderEntity";
import { IClientRepositoryPort } from "../../ports/IClientRepositoryPort";


@injectable()
export default class OrderCreateUseCase {
  constructor(
    @inject("OrderRepository") 
    private orderRepository: IOrderRepositoryPort,
    @inject("ClientRepository")
    private clientRepository: IClientRepositoryPort,
    @inject("DrinkRepository")
    private drinkRepository: IDrinkRepositoryPort,
    @inject("SnackRepository")
    private snackRepository: ISnackRepositoryPort,
    @inject("AccompanimentRepository")
    private accompanimentRepository: IAccompanimentRepositoryPort,
  ) {}

  async execute(params: CreateOrderExecuteParams): Promise<IOrder> {
    const {drinkId, snackId, accompanimentId, clientId, ...rest} = params

    const client = await this.clientRepository.findById(clientId)
    const drink = drinkId && await this.drinkRepository.findById(drinkId)
    const accompaniment = accompanimentId && await this.accompanimentRepository.findById(accompanimentId)
    const snack = snackId && await this.snackRepository.findById(snackId)

    if (!drink && !accompaniment && snack) {
      throw new Error("The order is incomplete. You must select either a drink, accompaniment or snack")
    }

    if (!client) {
      throw new Error("A client must be informed")

    }
    

    const order = await this.orderRepository.create({
      ...rest,
      client,
      ...(drink ? { drink } : {}),
      ...(accompaniment ? { accompaniment } : {}),
      ...(snack ? { snack } : {}),
    });
  
    return order;
  }  
}
