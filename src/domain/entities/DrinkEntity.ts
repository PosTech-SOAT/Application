import { ICategory } from "./CategoryEntity";

export interface IDrink {
  id: string;
  name: string;
  category: ICategory;
  description: string;
  price: number;
}