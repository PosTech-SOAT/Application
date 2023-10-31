import { IOrder } from './OrderEntity';
import { IProduct } from './ProductEntity';

export interface IOrdersProducts {
    id: string;
    order: IOrder;
    product: IProduct;
}
