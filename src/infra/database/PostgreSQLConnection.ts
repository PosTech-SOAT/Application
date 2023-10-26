import { DataSource } from 'typeorm';
import { PostgreSQLFactory } from '../factories/PostgreSQLFactory';

export class PostgreSQLConnection {
	private connection: DataSource | undefined;

	async initConnection(): Promise<void> {
		const factory = new PostgreSQLFactory();
		this.connection = await factory.create();
	}

	getConnection(): DataSource {
		if (!this.connection) {
			throw new Error('A conexão não foi estabelecida.');
		}
		return this.connection;
	}
}

export const DbConnection: PostgreSQLConnection = new PostgreSQLConnection();
DbConnection.initConnection();
