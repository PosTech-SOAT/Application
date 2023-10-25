import { IProduct } from '../domain/entities/ProductEntity';

export interface CreateProductExecuteParams  extends Omit<IProduct, 'category'>{
  categoryId: string;
}
