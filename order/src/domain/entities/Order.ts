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
import { OrdersProducts } from './OrdersProducts';

export enum OrderStatus {
	AGUARDANDO_PAGAMENTO = 'AGUARDANDO_PAGAMENTO',
  RECEBIDO = 'RECEBIDO',
  EM_PREPARACAO = 'EM_PREPARO',
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
  	default: OrderStatus.AGUARDANDO_PAGAMENTO,
  })
  	status: OrderStatus;

  @Column()
  	clientId: string;

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

