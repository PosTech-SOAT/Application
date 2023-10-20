import { ICategory } from '../../domain/entities/CategoryEntity';
import { ISnack } from '../../domain/entities/SnackEntity';

export type CreateSnackParams = {
    name: string
    category: ICategory
    description: string
    price: number
}

export type CreateSnackExecuteParams = {
    name: string
    categoryId: string
    description: string
    price: number
}

export interface ISnackRepositoryPort {
    list(): Promise<Array<ISnack>>
    findById(id: string): Promise<ISnack | null>
    delete(id: string): Promise<any>
    create(params: CreateSnackParams): Promise<ISnack>
}
