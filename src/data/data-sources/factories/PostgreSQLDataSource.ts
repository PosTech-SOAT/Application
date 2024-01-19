import { PostgreSQLFactory } from './PostgreSQLFactory';

const dataSource = new PostgreSQLFactory();

export default dataSource.dataSource;
