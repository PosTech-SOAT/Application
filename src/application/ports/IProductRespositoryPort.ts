import { ICategory } from '../../domain/entities/CategoryEntity';
import { IProduct } from '../../domain/entities/ProductEntity';

export type CreateOrUpdateProductParams = {
  name: string;
  description: string;
  price: number;
	category: ICategory;
}

export type UpdateProductParams = {
  name: string;
  description: string;
  price: number;
	categoryId: string;
}


export interface IProductRepositoryPort {
  create(params: CreateOrUpdateProductParams): Promise<IProduct>;
  findById(id: string): Promise<IProduct | null>;
  findByCategory(categoryId: string): Promise<IProduct[] | null>;
  list(ids?: Array<string>): Promise<IProduct[]>;
	update(id: string, params: Partial<CreateOrUpdateProductParams>): Promise<void>;
	delete(id: string): Promise<void>;
}
