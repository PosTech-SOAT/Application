import { IAccompaniment } from "../../domain/entities/AccompanimentEntity"
import { ICategory } from "../../domain/entities/CategoryEntity"

export type CreateAccompanimentExecuteParams = {
    name: string
    description: string
    price: number
    categoryId: string
}

export type CreateAccompanimentParams = {
    name: string
    description: string
    price: number
    category: ICategory
}

export interface IAccompanimentRepositoryPort {
    list(): Promise<Array<IAccompaniment>>
    findById(id: string): Promise<IAccompaniment | null>
    delete(id: string): Promise<any>
    create(params: CreateAccompanimentParams): Promise<IAccompaniment>
}