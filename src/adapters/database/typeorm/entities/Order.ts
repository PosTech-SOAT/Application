import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	Column,
	OneToMany,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Client } from './Client';
import { OrdersProducts } from './OrdersProducts';

export enum OrderStatus {
  RECEBIDO = 'RECEBIDO',
  EM_PREPARACAO = 'EM_PREPARACAO',
  PRONTO = 'PRONTO',
  FINALIZADO = 'FINALIZADO',
}

@Entity('Orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({
		type: 'enum',
		enum: OrderStatus,
		default: OrderStatus.RECEBIDO,
	})
  	status: OrderStatus;

	@ManyToOne(() => Client, client => client.orders)
  	client: Client;

	@OneToMany(() => OrdersProducts, product => product.order, { eager: true, cascade: true })
  	products: OrdersProducts[];

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
