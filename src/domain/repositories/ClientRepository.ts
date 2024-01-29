import { Repository } from 'typeorm';

import { Client } from '../entities/Client';
import { CreateClientParams, IClientRepository } from '../interfaces/repositories/IClientRepository';
import { DbConnection } from '../../data/data-sources/database/PostgreSQLConnection';
import { CreateClientParamsDto } from '../../infra/dto/CreateClientParamsDto';
import { IClient } from '../../infra/entities/ClientEntity';


export class ClientRepository implements IClientRepository{
	private connection: typeof DbConnection;

	constructor() {
		this.connection = DbConnection;
	}

	private getRepo(): Repository<Client> {
		return this.connection.getConnection().getRepository(Client);
	}

	async createClient(params: CreateClientParamsDto): Promise<IClient> {
		const repo = this.getRepo();

		const client = repo.create(params);

		return await repo.save(client);
	}

	async findByCPF(cpf: string): Promise<IClient | null> {
		const repo = this.getRepo();

		const client = await repo.findOne({ where: { cpf } });

		return client || null;
	}

	async findById(id: string): Promise<IClient | null> {
		const repo = this.getRepo();

		const client = await repo.createQueryBuilder('find_by_id')
			.where('id = :id', { id })
			.getOne();

		return client || null;
	}

	async list(): Promise<IClient[]> {
		const repo = this.getRepo();

		const clients = await repo.find();

		return clients;
	}

	async update(cpf: string, data: CreateClientParams): Promise<any> {
		const connection = this.getRepo();

		await connection.createQueryBuilder('client')
			.update()
			.where('cpf = :cpf', { cpf })
			.set({ ...data })
			.execute();
		return Promise.resolve();
	}

}
