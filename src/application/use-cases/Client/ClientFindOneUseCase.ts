import { inject, injectable } from 'tsyringe';
import { IClient } from '../../../domain/entities/ClientEntity';
import { IClientRepositoryPort } from '../../ports/IClientRepositoryPort';

@injectable()
export default class ClientFindOneUseCase {
	constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepositoryPort
	) {}

	async execute(id: string): Promise<IClient | null> {
		const client = await this.clientRepository.findById(id);
		return client;
	}
}
