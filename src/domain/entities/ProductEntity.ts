import { ICategory } from './CategoryEntity';
import { IOrder } from './OrderEntity';

export interface IProduct {
  id: string;
  name: string;
  description: string;
	price: number;
	category: ICategory;
}

