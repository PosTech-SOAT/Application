import { Repository } from 'typeorm';
import { DbConnection } from '../../../../infra/database/PostgreSQLConnection';
import { CreateOrderParams, IOrderRepositoryPort } from '../../../../application/ports/IOrderRepositoryPort';
import { IOrder } from '../../../../domain/entities/OrderEntity';
import { Order, OrderStatus } from '../entities/Order';
import { IOrdersProducts } from '../../../../domain/entities/OrdersProductsEntity';
import { Client } from '../entities/Client';
import { OrdersProducts } from '../entities/OrdersProducts';
import { Product } from '../entities/Product';
import { OrderDto } from '../../../../domain/dto/OrderDto';
import { mapOrderToOrderDto } from '../../../../domain/mappers/MapOrderToOrderDto';

export class OrderRepository implements IOrderRepositoryPort {
	private connection: typeof DbConnection;

	constructor() {
		this.connection = DbConnection;
	}

	private getRepo(): Repository<Order> {
		return this.connection.getConnection().getRepository(Order);
	}

	async list(): Promise<OrderDto[]> {
		const connection = this.getRepo();

		const orders = (await connection.find({relations: ['products', 'client']})).map(mapOrderToOrderDto);
		return orders
	}

	async listByStatus(): Promise<IOrder[]> {
		const connection = this.getRepo();

		return (await connection.createQueryBuilder('order')
				.leftJoinAndSelect('order.client', 'client')
				.leftJoinAndSelect('order.products', 'products')
				.leftJoinAndSelect('products.product', 'product')
				.getMany());

	}

	async findById(id: string): Promise<OrderDto | null> {
		const connection = this.getRepo();
		try {
			const order = await connection.createQueryBuilder('order')
				.leftJoinAndSelect('order.client', 'client')
				.leftJoinAndSelect('order.products', 'products')
				.leftJoinAndSelect('products.product', 'product')
				.where('order.id = :id', { id })
				.getOne();

			if (!order) {
				throw new Error('Order doesn\'t exists');
			}

			return mapOrderToOrderDto(order);
		} catch (error) {
			throw error;
		}
	}

	async update(id: string, status: OrderStatus): Promise<any> {
		const connection = this.getRepo();

		await connection.createQueryBuilder('update_order')
			.update()
			.where('id = :id', { id })
			.set({ status })
			.execute();
		return Promise.resolve();
	}

	async delete(id: string){
		const connection = this.getRepo();
		await connection.createQueryBuilder('delete_order')
			.delete()
			.from(Order)
			.where('id = :id', { id })
			.execute();
		return Promise.resolve();
	}

	async create(params: CreateOrderParams): Promise<IOrder> {
		const { products, client } = params;
		const connection = this.getRepo();
		const order = new Order();
		order.client = client as Client;
		order.products = products.map((product) => {
			const data = new OrdersProducts();
			data.product = product as Product;
			return data;
		}) as Array<OrdersProducts>
				  
		return connection.save(order);
	}
}
