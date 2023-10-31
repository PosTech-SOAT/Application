import { ICategory } from './CategoryEntity';

export interface IProduct {
  id: string;
  name: string;
  description: string;
	price: number;
	category: ICategory;
}

