import "dotenv/config"
import "reflect-metadata"
import { DataSource } from "typeorm"
import { Client } from "../../adapters/database/typeorm/entities/Client";
import { Category } from "../../adapters/database/typeorm/entities/Category";

const port = process.env.DB_PORT as number  | undefined;

export class PostgreSQLFactory {
    private data: DataSource
    constructor() {
        this.data =  new DataSource({
            type: "postgres",
            host: process.env.DB_HOST,
            port: port,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            entities: [Client, Category],
            migrations: ["./src/infra/typeorm/migrations/*.ts"],
            synchronize: true,
            logging: false,
        });
    }
    get dataSource(){
        return this.data
    }
    async create(): Promise<DataSource> {
        
        await this.data.initialize();
        return this.data;
    }
}

