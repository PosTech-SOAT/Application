import { ICategory } from "./CategoryEntity";

export interface IAccompaniment {
  id: string;
  name: string;
  category: ICategory;
  description: string;
  price: number;
}
