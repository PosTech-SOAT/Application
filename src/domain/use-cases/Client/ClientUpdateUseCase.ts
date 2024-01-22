import { inject, injectable } from 'tsyringe';
import { CreateClientParams, IClientRepository } from '../../interfaces/repositories/IClientRepository';
import { IBaseUseCase } from '../../interfaces/use-cases/IBaseUseCase';

type ClientUpdateParams = {
	id: string;
	params: CreateClientParams;
};

@injectable()
export default class ClientUpdateUseCase implements IBaseUseCase<ClientUpdateParams, any>{
	constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository
	) {}

	async execute({id, params}: ClientUpdateParams): Promise<any> {
		const client = await this.clientRepository.update(id, params);

		return client;
	}
}
