import { DeepPartial } from "typeorm"
import { IAccompaniment } from "../../domain/entities/AccompanimentEntity"
import { IClient } from "../../domain/entities/ClientEntity"
import { IDrink } from "../../domain/entities/DrinkEntity"
import { IOrder } from "../../domain/entities/OrderEntity"
import { ISnack } from "../../domain/entities/SnackEntity"

export type CreateOrderExecuteParams = {
    name: string
    description: string
    price: number
    clientId: string
    snackId?: string
    drinkId?: string
    accompanimentId?: string
}

export type CreateOrderParams = {
    name: string
    description: string
    client: IClient
    price: number
    snack?: DeepPartial<ISnack>
    drink?: DeepPartial<IDrink>
    accompaniment?: DeepPartial<IAccompaniment>
}

export interface IOrderRepositoryPort {
    list(): Promise<Array<IOrder>>
    findById(id: string): Promise<IOrder | null>
    delete(id: string): Promise<any>
    create(params: CreateOrderParams): Promise<IOrder>
}