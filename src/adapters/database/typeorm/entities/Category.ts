import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("Categories")
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: "varchar", length: 25, unique: true})
    name: string;

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