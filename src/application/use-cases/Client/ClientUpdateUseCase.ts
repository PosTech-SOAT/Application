import { inject, injectable } from 'tsyringe';
import { IClient } from '../../../domain/entities/ClientEntity';
import { CreateClientParams, IClientRepositoryPort } from '../../ports/IClientRepositoryPort';

@injectable()
export default class ClientUpdateUseCase {
	constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepositoryPort
	) {}

	async execute(id: string, params: CreateClientParams): Promise<any> {
		const client = await this.clientRepository.update(id, params);

		return client;
	}
}
