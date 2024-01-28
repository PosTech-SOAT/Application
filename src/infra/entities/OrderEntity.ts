import { OrderStatus } from '../../domain/entities/Order';
import { IClient } from './ClientEntity';
import { IOrdersProducts } from './OrdersProductsEntity';
import { IMercadoPagoPayment, IMercadoPagoPaymentResponse } from './Payment';

export interface IOrder {
  id: string;
  status: OrderStatus;
	client: IClient;
	products: Array<IOrdersProducts>;
	paymentInfo?: IMercadoPagoPayment;
  paymentResponse?: IMercadoPagoPaymentResponse;
}
