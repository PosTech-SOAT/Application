import { OrderStatus } from "../../adapters/database/typeorm/entities/Order";
import { IAccompaniment } from "./AccompanimentEntity";
import { IClient } from "./ClientEntity";
import { IDrink } from "./DrinkEntity";
import { ISnack } from "./SnackEntity";


export interface IOrder {
  id: string;
  snack?: ISnack;
  accompaniment?: IAccompaniment;
  drink?: IDrink;
  status: OrderStatus;
  client: IClient;
}

