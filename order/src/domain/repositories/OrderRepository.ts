import axios from 'axios';

import { Not, Repository } from 'typeorm';
import { Order, OrderStatus } from '../entities/Order';
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

		const orders = await connection.find({
			relations: ['products'],
			where: { status: Not(OrderStatus.FINALIZADO) },
		});

		const orderDtos = await Promise.all(orders.map(async order => {
			const clientData = JSON.parse(order.clientId);
			const clientResponse = await axios.get(`http://postech_customer_container:3001/api/clients/${clientData.id}`);
			return mapOrderToOrderDto(order, clientResponse.data);
		}));

		return orderDtos;
	}

	async listByStatus(): Promise<IOrder[]> {
		const connection = this.getRepo();

		const orders = await connection
			.createQueryBuilder('order')
			.leftJoinAndSelect('order.products', 'products')
			.leftJoinAndSelect('products.product', 'product')
			.getMany();

		const clientResponses = await Promise.all(
			orders.map(order => {
				const clientData = JSON.parse(order.clientId);
				return axios.get(`http://postech_customer_container:3001/api/clients/${clientData.id}`);
			})
		);

		const ordersWithClientData = orders.map((order, index) => {
			const client = clientResponses[index].data;
			const products = order.products.map(product => ({...product, order: {...order, client}}));
			return { ...order, client, products };
		});

		return ordersWithClientData as unknown as IOrder[];
	}

	async findById(id: string): Promise<OrderDto | null> {
		const connection = this.getRepo();
		try {
			const order = await connection
				.createQueryBuilder('order')
				.leftJoinAndSelect('order.products', 'products')
				.leftJoinAndSelect('products.product', 'product')
				.where('order.id = :id', { id })
				.getOne();

			if (!order) {
				throw new Error('Order doesnt exists');
			}

			const clientData = JSON.parse(order.clientId);
			const clientResponse = await axios.get(`http://postech_customer_container:3001/api/clients/${clientData.id}`);

			const orderDto = mapOrderToOrderDto(order, clientResponse.data);
			return orderDto;
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
		const { productIds, clientId } = params;
		const connection = this.getRepo();
		const order = new Order();

		const clientResponse = await axios.get(`http://postech_customer_container:3001/api/clients/${clientId}`);
		if (!clientResponse.data) {
			throw new Error(`Client with id ${clientId} not found`);
		}
		order.clientId = clientResponse.data;

		const products = await connection.manager.findByIds(Product, productIds);
		if (products.length !== productIds.length) {
			throw new Error('Some products not found');
		}
		order.products = products.map((product) => {
			const data = new OrdersProducts();
			data.product = product;
			return data;
		});

		return connection.save(order);
	}
}
