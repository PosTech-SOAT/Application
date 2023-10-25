import { In, Repository } from 'typeorm';
import { DbConnection } from '../../../../infra/database/PostgreSQLConnection';
import { IProduct } from '../../../../domain/entities/ProductEntity';
import { CreateProductParams, IProductRepositoryPort } from '../../../../application/ports/IProductRespositoryPort';
import { Product } from '../entities/Product';

export class ProductRepository implements IProductRepositoryPort {

	private connection: typeof DbConnection;

	constructor() {
		this.connection = DbConnection;
	}

	private async getConnection(): Promise<Repository<Product>> {
		if (!this.connection) {
			throw new Error('A conexão não foi estabelecida.');
		}

		const con = await this.connection.getConnection();

		if (!con) {
			throw new Error('A conexão não foi obtida com sucesso.');
		}

		return con.getRepository(Product);
	}

	async create(params: CreateProductParams): Promise<IProduct> {
		const connection = await this.getConnection();
		const client = connection.create(params);

		return connection.save(client);
	}

	async list(ids?: Array<string>): Promise<IProduct[]> {
		const connection = await this.getConnection();

		if(!ids) {
			return connection.find({relations: ['category']});
		}

		return connection.find({where: {id: In(ids)}, relations: ['category']});
	}

	async findById(id: string): Promise<IProduct | null> {
		const connection = await this.getConnection();
		try {
			const product = await connection.createQueryBuilder('find_by_id')
				.where('id = :id', { id })
				.getOne();

			if (!product) {
				throw new Error('Product doesn\'t exists');
			}

			return product;
		} catch (error) {
			throw error;
		}
	}

	async findByCategory(categoryId: string): Promise<IProduct[] | null> {
		const connection = await this.getConnection();
		try {
			const products = await connection
				.createQueryBuilder('find_by_category_Id')
				.where('categoryId = :categoryId', { categoryId })
				.getMany();

			if (!products) {
				throw new Error('Products doesn\'t exists');
			}

			return products;
		} catch (error) {
			throw error;
		}
	}

	async edit(id: string, params: CreateProductParams): Promise<void> {
		const connection = await this.getConnection();
		try {
			await connection
				.createQueryBuilder('find_by_category_Id')
				.update()
				.where('id = :id', { id })
				.set(params)
				.execute();

			return Promise.resolve();
		} catch (error) {
			throw error;
		}
	}

	async delete(id: string): Promise<void>{
		const connection = await this.getConnection();
		await connection.createQueryBuilder('delete_Product')
			.delete()
			.from(Product)
			.where('id = :id', { id })
			.execute();
		return Promise.resolve();
	}
}







