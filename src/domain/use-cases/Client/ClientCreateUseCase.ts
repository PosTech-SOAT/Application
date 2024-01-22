import { inject, injectable } from 'tsyringe';
import { CreateClientParams, IClientRepository } from '../../interfaces/repositories/IClientRepository';
import { IClient } from '../../../infra/entities/ClientEntity';
import { IBaseUseCase } from '../../interfaces/use-cases/IBaseUseCase';

@injectable()
export default class ClientCreateUseCase implements IBaseUseCase<CreateClientParams, IClient>{
	constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository
	) {}

	async execute(params: CreateClientParams): Promise<IClient> {
		const existingClient = await this.clientRepository.findByCPF(params.cpf);

		if (existingClient) {
			throw new Error('CPF already exists in the database');
		}

		const client = await this.clientRepository.createClient({
			name: params.name,
			email: params.email,
			cpf: params.cpf
		});

		return client;
	}
}
