import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Snack } from './Snack';
import { Client } from './Client';
import { Accompaniment } from './Accompaniment';
import { Drink } from './Drink';

enum OrderStatus {
  RECEBIDO = 'RECEBIDO',
  EM_PREPARACAO = 'EM PREPARACAO',
  PRONTO = 'PRONTO',
  FINALIZADO = 'FINALIZADO',
}

@Entity('Orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  	id: string;

  @ManyToOne(() => Snack, { eager: true })
  @JoinColumn()
  	snack: Snack;

  @ManyToOne(() => Accompaniment, { eager: true })
  @JoinColumn()
  	accompaniment: Accompaniment;

  @ManyToOne(() => Drink, { eager: true })
  @JoinColumn()
  	drink: Drink;

  @ManyToOne(() => Client, { eager: true })
  @JoinColumn()
  	client: Client;

  @Column({
  	type: 'enum',
  	enum: OrderStatus,
  	default: OrderStatus.RECEBIDO,
  })
  	status: OrderStatus;

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
