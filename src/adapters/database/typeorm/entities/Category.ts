import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Snack } from "./Snack";
import { Drink } from "./Drink";
import { Accompaniment } from "./Accompaniment";

@Entity("Categories")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({type: "varchar", length: 25, unique: true})
  name: string;

  @OneToMany(() => Snack, (snack) => snack.category)
  snacks: Array<Snack>;

  @OneToMany(() => Drink, (drink) => drink.category)
  drinks: Array<Drink>;

  @OneToMany(() => Accompaniment, (accompaniment) => accompaniment.category)
  accompaniments: Array<Drink>;

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