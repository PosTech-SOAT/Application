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

		if (!client) {
			return null;
		}

		const clientData: IClient = {
			id: client.id,
			name: client.name,
			cpf: client.cpf,
			email: client.email,
		};

		return clientData;
	}
}
