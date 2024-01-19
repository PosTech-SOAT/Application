import { inject, injectable } from 'tsyringe';
import { IClientRepository } from '../../interfaces/repositories/IClientRepository';
import { IClient } from '../../../infra/entities/ClientEntity';

@injectable()
export default class ClientFindOneUseCase {
	constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository
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
