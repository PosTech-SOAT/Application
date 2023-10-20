import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Client } from "../../adapters/database/typeorm/entities/Client";
import { Category } from "../../adapters/database/typeorm/entities/Category";
import { Snack } from "../../adapters/database/typeorm/entities/Snack";
import { Drink } from "../../adapters/database/typeorm/entities/Drink";
import { Accompaniment } from "../../adapters/database/typeorm/entities/Accompaniment";
import { Order } from "../../adapters/database/typeorm/entities/Order";

const port = parseInt(process.env.DB_PORT || '5432');

export class PostgreSQLFactory {
    private data: DataSource;

    constructor() {
        this.data = new DataSource({
            type: "postgres",
            host: process.env.DB_HOST,
            port: port,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            entities: [Client, Category, Snack, Drink, Accompaniment, Order],
            migrations: ["./src/infra/typeorm/migrations/*.ts"],
            migrationsTableName: "Migrations",
            synchronize: true,
            logging: false,
        });
    }

    get dataSource() {
        return this.data;
    }

    async create(): Promise<DataSource> {
        await this.data.initialize();
        return this.data;
    }
}
