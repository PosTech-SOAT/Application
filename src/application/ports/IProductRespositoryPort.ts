import { ICategory } from '../../domain/entities/CategoryEntity';
import { IProduct } from '../../domain/entities/ProductEntity';

export type CreateProductParams = {
  name: string;
  description: string;
  price: number;
	category: ICategory;
}

export interface IProductRepositoryPort {
  create(params: CreateProductParams): Promise<IProduct>;
  findByCategory(categoryId: string): Promise<IProduct[] | null>;
  list(ids?: Array<string>): Promise<IProduct[]>;
	edit(id: string, params: CreateProductParams): Promise<void>;
	delete(id: string): Promise<void>;
}
