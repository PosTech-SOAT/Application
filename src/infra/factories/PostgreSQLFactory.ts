import "dotenv/config"
import "reflect-metadata"
import { DataSource } from "typeorm"
import { Client } from "../../adapters/database/typeorm/entities/Client";

const port = process.env.DB_PORT as number  | undefined;

export class PostgreSQLFactory {
    async create(): Promise<DataSource> {
        const dataSource = new DataSource({
            type: "postgres",
            host: process.env.DB_HOST,
            port: port,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            entities: [Client],
            migrations: ["./src/infra/typeorm/migrations/*.ts"],
            synchronize: true
        });
        await dataSource.initialize();
        return dataSource;
    }
}

