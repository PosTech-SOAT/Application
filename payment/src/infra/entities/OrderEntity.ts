import { IClient } from './ClientEnitlty';
import { IOrdersProducts } from './OrdersProductsEntity';

export enum OrderStatus {
	AGUARDANDO_PAGAMENTO = 'AGUARDANDO_PAGAMENTO',
	RECEBIDO = 'RECEBIDO',
	EM_PREPARACAO = 'EM_PREPARO',
	PRONTO = 'PRONTO',
	FINALIZADO = 'FINALIZADO',
}

export interface IOrder {
	id: string;
	status: OrderStatus;
	client?: IClient;
	products: Array<IOrdersProducts>;
}
