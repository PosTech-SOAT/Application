import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Category } from "./Category";

@Entity("Snacks")
export class Snack {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: "varchar", length: 100, unique: true})
    name: string;

    @ManyToOne(() => Category, (category) => category.snacks)
    category: Category;

    @Column({type: "varchar", length: 255})
    description: string;

    @Column({type: "float"})
    price: number

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