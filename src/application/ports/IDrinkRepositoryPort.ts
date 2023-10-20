import { ICategory } from "../../domain/entities/CategoryEntity"
import { IDrink } from "../../domain/entities/DrinkEntity"

export type CreateDrinkExecuteParams = {
    name: string
    description: string
    price: number
    categoryId: string
}

export type CreateDrinkParams = {
    name: string
    description: string
    price: number
    category: ICategory
}

export interface IDrinkRepositoryPort {
    list(): Promise<Array<IDrink>>
    findById(id: string): Promise<IDrink | null>
    delete(id: string): Promise<any>
    create(params: CreateDrinkParams): Promise<IDrink>
}