import { DataSource } from "typeorm";
import { PostgreSQLFactory } from "../factories/PostgreSQLFactory";

class PostgreSQLConnection {
  private connection: DataSource | undefined;

  async getConnection(): Promise<DataSource | undefined> {
    if (this.connection?.isInitialized) {
      return this.connection;
    }

    const factory = new PostgreSQLFactory();

    this.connection = await factory.create();

    return this.connection;
  }
}

export const DbConnection: PostgreSQLConnection = new PostgreSQLConnection();
