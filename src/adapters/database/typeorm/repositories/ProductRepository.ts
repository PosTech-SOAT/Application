import { In, Repository } from 'typeorm';
import { DbConnection } from '../../../../infra/database/PostgreSQLConnection';
import { IProduct } from '../../../../domain/entities/ProductEntity';
import { CreateOrUpdateProductParams, IProductRepositoryPort } from '../../../../application/ports/IProductRespositoryPort';
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

	async create(params: CreateOrUpdateProductParams): Promise<IProduct> {
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
			const product = await connection.createQueryBuilder('product')
				.innerJoinAndSelect('product.category', 'category')
				.where('product.id = :product_id', { product_id: id })
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
				.createQueryBuilder('product')
				.innerJoinAndSelect('product.category', 'category')
				.where('category.id = :categoryId', { categoryId })
				.getMany();

			if (!products) {
				throw new Error('There is no product of this category');
			}

			return products;
		} catch (error) {
			throw error;
		}
	}

	async update(id: string, params: CreateOrUpdateProductParams): Promise<void> {
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







