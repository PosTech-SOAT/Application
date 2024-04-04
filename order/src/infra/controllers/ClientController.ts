import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ClientCreateUseCase from '../../domain/use-cases/Client/ClientCreateUseCase';
import ClientListUseCase from '../../domain/use-cases/Client/ClientListUseCase';
import ClientFindOneUseCase from '../../domain/use-cases/Client/ClientFindOneUseCase';
import ClientUpdateUseCase from '../../domain/use-cases/Client/ClientUpdateUseCase';

export default class ClientController {

	async create(request: Request, response: Response) {
		const { name, email, cpf } = request.body;

		if (!name || !email || !cpf) {
			return response.status(400).json({ message: 'Missing required data' });
		}

		const createClientUseCase = container.resolve(ClientCreateUseCase);

		try {
			await createClientUseCase.execute({ name, email, cpf });

			return response.status(201).json({ message: 'Client created successfully' });
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async list(request: Request, response: Response) {
		const clientListUseCase = container.resolve(ClientListUseCase);

		try {
			const clients = await clientListUseCase.execute();

			return response.status(200).json(clients);
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async findByCpf(request: Request, response: Response) {
		const clientListUseCase = container.resolve(ClientFindOneUseCase);

		try {
			const client = await clientListUseCase.execute(request.params.cpf);

			return response.status(200).json(client);
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async update(request: Request, response: Response) {
		const clientListUseCase = container.resolve(ClientUpdateUseCase);

		try {
			await clientListUseCase.execute({id: request.params.cpf, params: request.body});
			return response.status(200).json({ message: 'Client updated successfully' });
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}
}
