import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Client } from '../../adapters/database/typeorm/entities/Client';
import { Category } from '../../adapters/database/typeorm/entities/Category';
import { Order } from '../../adapters/database/typeorm/entities/Order';
import { Product } from '../../adapters/database/typeorm/entities/Product';
import { OrdersProducts } from '../../adapters/database/typeorm/entities/OrdersProducts';

const port = parseInt(process.env.DB_PORT || '5432');

export class PostgreSQLFactory {
	private data: DataSource;

	constructor() {
		this.data = new DataSource({
			type: 'postgres',
			host: process.env.DB_HOST || 'database',
			port: port,
			username: process.env.DB_USER || 'root',
			password: process.env.DB_PASS || 'root',
			database: process.env.DB_NAME || 'postech',
			entities: [Client, Category, Order, Product, OrdersProducts],
			migrations: ['./src/infra/typeorm/migrations/*.ts'],
			migrationsTableName: 'Migrations',
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
