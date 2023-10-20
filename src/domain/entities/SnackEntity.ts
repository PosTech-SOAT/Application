import { ICategory } from "./CategoryEntity";

export interface ISnack {
  id: string;
  name: string;
  category: ICategory;
  description: string;
  price: number;
}