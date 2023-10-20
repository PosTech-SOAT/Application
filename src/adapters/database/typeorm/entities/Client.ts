import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('Clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  	id: string;

  @Column({type: 'varchar', length: 255})
  	name: string;

  @Column({type: 'varchar', length: 255})
  	email: string;

  @Column({type: 'varchar', length: 11})
  	cpf: string;

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

