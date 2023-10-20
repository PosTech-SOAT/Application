import { IOrder } from "../domain/entities/OrderEntity";

export interface OrderDto extends IOrder {
    price: number
}