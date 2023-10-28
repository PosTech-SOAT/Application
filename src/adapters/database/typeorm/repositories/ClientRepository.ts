import { Repository } from 'typeorm';
import { IClient } from '../../../../domain/entities/ClientEntity';
import { CreateClientParamsDto } from '../../../../domain/dto/CreateClientParamsDto';
import { Client } from '../entities/Client';
import { DbConnection } from '../../../../infra/database/PostgreSQLConnection';
import { IClientRepositoryPort } from '../../../../application/ports/IClientRepositoryPort';

export class ClientRepository implements IClientRepositoryPort{
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

}
