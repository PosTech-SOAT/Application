import "dotenv/config"
import "reflect-metadata"
import { DataSource } from "typeorm"
import { Client } from "../../adapters/database/typeorm/entities/Client"

const port = process.env.DB_PORT as number  | undefined;
export const PostgreSQLFactory = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    migrations: ["./src/infra/typeorm/migrations/*.ts"],
    entities: [Client],
    synchronize: false,
});
