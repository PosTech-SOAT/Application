import { Not, Repository } from 'typeorm';
import { Order, OrderStatus } from '../entities/Order';
import { Client } from '../entities/Client';
import { OrdersProducts } from '../entities/OrdersProducts';
import { Product } from '../entities/Product';
import {
	CreateOrderParams,
	IOrderRepository,
} from '../interfaces/repositories/IOrderRepository';
import { DbConnection } from '../../data/data-sources/database/PostgreSQLConnection';
import { OrderDto } from '../../infra/dto/OrderDto';
import { mapOrderToOrderDto } from '../../infra/mappers/MapOrderToOrderDto';
import { IOrder } from '../../infra/entities/OrderEntity';

export class OrderRepository implements IOrderRepository {
	private connection: typeof DbConnection;

	constructor() {
		this.connection = DbConnection;
	}

	private getRepo(): Repository<Order> {
		return this.connection.getConnection().getRepository(Order);
	}

	async list(): Promise<OrderDto[]> {
		const connection = this.getRepo();

		const orders = (
			await connection.find({
				relations: ['products', 'client'],
				where: { status: Not(OrderStatus.FINALIZADO) },
			})
		).map(mapOrderToOrderDto);
		return orders;
	}

	async listByStatus(): Promise<IOrder[]> {
		const connection = this.getRepo();

		return await connection
			.createQueryBuilder('order')
			.leftJoinAndSelect('order.client', 'client')
			.leftJoinAndSelect('order.products', 'products')
			.leftJoinAndSelect('products.product', 'product')
			.getMany();
	}

	async findById(id: string): Promise<OrderDto | null> {
		const connection = this.getRepo();
		try {
			const order = await connection
				.createQueryBuilder('order')
				.leftJoinAndSelect('order.client', 'client')
				.leftJoinAndSelect('order.products', 'products')
				.leftJoinAndSelect('products.product', 'product')
				.where('order.id = :id', { id })
				.getOne();

			if (!order) {
				throw new Error('Order doesnt exists');
			}

			return mapOrderToOrderDto(order);
		} catch (error) {
			throw error;
		}
	}

	async update(id: string, status: OrderStatus): Promise<any> {
		const connection = this.getRepo();

		await connection
			.createQueryBuilder('update_order')
			.update()
			.where('id = :id', { id })
			.set({ status })
			.execute();
		return Promise.resolve();
	}

	async delete(id: string) {
		const connection = this.getRepo();
		await connection
			.createQueryBuilder('delete_order')
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
		}) as Array<OrdersProducts>;

		return connection.save(order);
	}
}
