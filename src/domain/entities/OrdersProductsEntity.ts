import { IOrder } from './OrderEntity';
import { IProduct } from './ProductEntity';

export interface IOrdersProducts {
    id: number;
    order: IOrder;
    product: IProduct;
}
