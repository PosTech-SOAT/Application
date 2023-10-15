import { IAccompaniment } from "./AccompanimentEntity";
import { IClient } from "./ClientEntity";
import { IDrink } from "./DrinkEntity";
import { ISnack } from "./SnackEntity";

enum Status {
  recebido = 'RECEBIDO',
  emPreparacao = 'EM PREPARACAO',
  pronto = 'PRONTO', 
  finalizado = 'FINALIZADO'
}

export interface IOrder {
  id: string;
  snack: ISnack;
  accompaniment: IAccompaniment;
  drink: IDrink;
  status: Status;
  client: IClient;
}

