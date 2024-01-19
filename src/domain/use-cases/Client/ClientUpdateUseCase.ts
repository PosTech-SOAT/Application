import { inject, injectable } from 'tsyringe';
import { CreateClientParams, IClientRepository } from '../../interfaces/repositories/IClientRepository';

@injectable()
export default class ClientUpdateUseCase {
	constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository
	) {}

	async execute(id: string, params: CreateClientParams): Promise<any> {
		const client = await this.clientRepository.update(id, params);

		return client;
	}
}
