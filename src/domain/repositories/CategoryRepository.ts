import { Repository } from 'typeorm';
import { Category } from '../entities/Category';
import { CreateCategoryParams, ICategoryRepository } from '../interfaces/repositories/ICategoryRepository';
import { DbConnection } from '../../data/data-sources/database/PostgreSQLConnection';
import { ICategory } from '../../infra/entities/CategoryEntity';

export class CategoryRepository implements ICategoryRepository {
	private connection: typeof DbConnection;

	constructor() {
		this.connection = DbConnection;
	}

	private getRepo(): Repository<Category> {
		return this.connection.getConnection().getRepository(Category);
	}

	async list(): Promise<ICategory[]> {
		const connection = this.getRepo();

		return connection.find();
	}
	async findById(id: string): Promise<ICategory | null> {
		const connection = this.getRepo();

		return connection.createQueryBuilder('find_by_id')
			.where('id = :id', { id })
			.getOne();

	}
	async delete(id: string){
		const connection = this.getRepo();
		await connection.createQueryBuilder('Categories')
			.delete()
			.from(Category)
			.where('id = :id', { id })
			.execute();
		return Promise.resolve();
	}

	async create(params: CreateCategoryParams): Promise<ICategory> {
		const connection = this.getRepo();
		const category = connection.create(params);

		return connection.save(category);
	}

	async update(id: string, data: CreateCategoryParams): Promise<any> {
		const connection = this.getRepo();

		await connection.createQueryBuilder('category')
			.update()
			.where('id = :id', { id })
			.set({ ...data })
			.execute();
		return Promise.resolve();
	}
}
