import { In, Repository } from 'typeorm';

import { Product } from '../entities/Product';
import { CreateOrUpdateProductParams, IProductRepository } from '../interfaces/repositories/IProductRespository';
import { DbConnection } from '../../data/data-sources/database/PostgreSQLConnection';
import { IProduct } from '../../infra/entities/ProductEntity';

export class ProductRepository implements IProductRepository {
	private connection: typeof DbConnection;

	constructor() {
		this.connection = DbConnection;
	}

	private getRepo(): Repository<Product> {
		return this.connection.getConnection().getRepository(Product);
	}

	async create(params: CreateOrUpdateProductParams): Promise<IProduct> {
		const connection = this.getRepo();
		const client = connection.create(params);

		return connection.save(client);
	}

	async list(ids?: Array<string>): Promise<IProduct[]> {
		const connection = this.getRepo();

		if(!ids) {
			return connection.find({relations: ['category']});
		}

		return connection.find({where: {id: In(ids)}, relations: ['category']});
	}

	async findById(id: string): Promise<IProduct | null> {
		const connection = this.getRepo();
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
		const connection = this.getRepo();
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
		const connection = this.getRepo();
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
		const connection = this.getRepo();
		await connection.createQueryBuilder('delete_Product')
			.delete()
			.from(Product)
			.where('id = :id', { id })
			.execute();
		return Promise.resolve();
	}
}







