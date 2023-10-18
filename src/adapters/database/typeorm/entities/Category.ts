import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Snack } from "./Snack";

@Entity("Categories")
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: "varchar", length: 25, unique: true})
    name: string;

    @OneToMany(() => Snack, (snack) => snack.category)
    snacks: Array<Snack>;

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