import { Repository } from 'typeorm';
import { CreateSnackParams, ISnackRepositoryPort } from '../../../../application/ports/ISnackRepositoryPort';
import { DbConnection } from '../../../../infra/database/PostgreSQLConnection';
import { Snack } from '../entities/Snack';
import { ISnack } from '../../../../domain/entities/SnackEntity';


export class SnackRepository implements ISnackRepositoryPort {

	private connection: typeof DbConnection;

	constructor() {
		this.connection = DbConnection;
	}

	private async getConnection(): Promise<Repository<Snack>> {
		if (!this.connection) {
			throw new Error('A conexão não foi estabelecida.');
		}

		const con = await this.connection.getConnection();

		if (!con) {
			throw new Error('A conexão não foi obtida com sucesso.');
		}

		return con.getRepository(Snack);
	}

	async list(): Promise<ISnack[]> {
		const connection = await this.getConnection();

		return connection.find();
	}
	async findById(id: string): Promise<ISnack | null> {
		const connection = await this.getConnection();

		return connection.findOne({ where: { id}, relations: ['category'] });
	}
	async delete(id: string){
		const connection = await this.getConnection();
		await connection.createQueryBuilder('Snack')
			.delete()
			.from(Snack)
			.where('id = :id', { id })
			.execute();
		return Promise.resolve();
	}
	async create(params: CreateSnackParams): Promise<ISnack> {
		const connection = await this.getConnection();
		const client = connection.create(params);

		return connection.save(client);
	}
}
