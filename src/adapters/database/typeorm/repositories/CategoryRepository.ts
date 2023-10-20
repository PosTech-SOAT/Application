import { Repository } from 'typeorm';
import { CreateCategoryParams, ICategoryRepositoryPort } from '../../../../application/ports/ICategoryRepositoryPort';
import { DbConnection } from '../../../../infra/database/PostgreSQLConnection';
import { Category } from '../entities/Category';
import { ICategory } from '../../../../domain/entities/CategoryEntity';

export class CategoryRepository implements ICategoryRepositoryPort {

	private connection: typeof DbConnection;

	constructor() {
		this.connection = DbConnection;
	}

	private async getConnection(): Promise<Repository<Category>> {
		if (!this.connection) {
			throw new Error('A conexão não foi estabelecida.');
		}

		const con = await this.connection.getConnection();

		if (!con) {
			throw new Error('A conexão não foi obtida com sucesso.');
		}

		return con.getRepository(Category);
	}

	async list(): Promise<ICategory[]> {
		const connection = await this.getConnection();

		return connection.find();
	}
	async findById(id: string): Promise<ICategory | null> {
		const connection = await this.getConnection();

		return connection.findOne({ where: { id} });
	}
	async delete(id: string){
		const connection = await this.getConnection();
		await connection.createQueryBuilder('Categories')
			.delete()
			.from(Category)
			.where('id = :id', { id })
			.execute();
		return Promise.resolve();
	}
	async create(params: CreateCategoryParams): Promise<ICategory> {
		const connection = await this.getConnection();
		const client = connection.create(params);

		return connection.save(client);
	}
}
