import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Category } from './Category';
import { Order } from './Order';
import { OrdersProducts } from './OrdersProducts';

@Entity('Products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  	id: string;

  @Column({ type: 'varchar', length: 25, unique: true })
  	name: string;

	@Column({ type: 'varchar' })
		description: string;

	@Column({ type: 'float' })
		price: number;

	@ManyToOne(() => Category, category => category.products)
	 	category: Category;

	@OneToMany(() => OrdersProducts, order => order.product)
		orders: Array<Order>;

  @CreateDateColumn()
  	createdAt: Date = new Date();

  @UpdateDateColumn()
  	updatedAt: Date = new Date();

  constructor() {
  	if (!this.id) {
  		this.id = uuidV4();
  	}
  }
}
