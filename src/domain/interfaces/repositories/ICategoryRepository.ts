import { ICategory } from '../../../infra/entities/CategoryEntity';

export type CreateCategoryParams = {
    name: string,
		description: string,
}

export interface ICategoryRepository {
	list(): Promise<Array<ICategory>>
	findById(id: string): Promise<ICategory | null>
	delete(id: string): Promise<any>
	create(params: CreateCategoryParams): Promise<ICategory>
	update(id:string, params: CreateCategoryParams): Promise<any>
}
