import { inject, injectable } from 'tsyringe';
import { IClientRepository } from '../../interfaces/repositories/IClientRepository';
import { IClient } from '../../../infra/entities/ClientEntity';
import { IBaseUseCase } from '../../interfaces/use-cases/IBaseUseCase';

@injectable()
export default class ClientFindOneUseCase implements IBaseUseCase<string, IClient | null>{
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
