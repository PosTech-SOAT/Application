import { IProduct } from '../entities/ProductEntity';

export interface CreateProductExecuteParams  extends Omit<IProduct, 'category'>{
  categoryId: string;
}
