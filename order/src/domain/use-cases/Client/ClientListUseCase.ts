import { inject, injectable } from 'tsyringe';
import { IClientRepository } from '../../interfaces/repositories/IClientRepository';
import { IClient } from '../../../infra/entities/ClientEntity';
import { IBaseUseCase } from '../../interfaces/use-cases/IBaseUseCase';

@injectable()
export default class ClientListUseCase implements IBaseUseCase<void, IClient[]>{
	constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository
	) {}

	async execute(): Promise<IClient[]> {
		const clients = await this.clientRepository.list();

		const clientsList = clients.map(client => {
			return {
				id: client.id,
				name: client.name,
				email: client.email,
				cpf: client.cpf
			};
		});

		return clientsList;
	}
}
