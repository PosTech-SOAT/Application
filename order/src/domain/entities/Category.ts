import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Product } from './Product';

@Entity('Categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  	id: string;

  @Column({type: 'varchar', length: 255, unique: true})
  	name: string;

	@Column({type: 'varchar'})
		description: string;

	@OneToMany(() => Product, product => product.category)
  	products: Product[];

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
