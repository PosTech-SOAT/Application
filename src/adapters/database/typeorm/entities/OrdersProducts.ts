import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './Product';
import { Order } from './Order';

@Entity('Orders_Products')
export class OrdersProducts {
  @PrimaryGeneratedColumn('uuid')
  	id: string;

  @ManyToOne(() => Product, product => product.orders, { eager: true, onDelete: 'NO ACTION' })
  	product: Product;

  @ManyToOne(() => Order, order => order.products, { onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  	order: Order;

}
