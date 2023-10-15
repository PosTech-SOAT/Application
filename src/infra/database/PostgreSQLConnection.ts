import { DataSource } from "typeorm";
import { PostgreSQLFactory } from "../factories/PostgreSQLFactory";

class PostgreSQLConnection {
  private connection: DataSource | undefined;

  async getConnection(): Promise<DataSource | undefined> {
    if (this.connection) {
      return this.connection;
    }

    this.connection = PostgreSQLFactory;

    return this.connection;
  }
}

export default new PostgreSQLConnection();