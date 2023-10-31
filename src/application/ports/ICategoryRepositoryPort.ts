import { ICategory } from '../../domain/entities/CategoryEntity';

export type CreateCategoryParams = {
    name: string,
		description: string,
}

export interface ICategoryRepositoryPort {
	list(): Promise<Array<ICategory>>
	findById(id: string): Promise<ICategory | null>
	delete(id: string): Promise<any>
	create(params: CreateCategoryParams): Promise<ICategory>
}
