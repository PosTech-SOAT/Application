import { inject, injectable } from 'tsyringe';
import { IClient } from '../../../domain/entities/ClientEntity';
import { IClientRepositoryPort } from '../../ports/IClientRepositoryPort';

@injectable()
export default class ClientFindOneUseCase {
	constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepositoryPort
	) {}

	async execute(cpf: string): Promise<IClient | null> {
		const client = await this.clientRepository.findByCPF(cpf);
		return client;
	}
}
