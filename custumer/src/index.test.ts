import 'reflect-metadata';
import { ClientRepository } from './domain/repositories/ClientRepository';
import { CreateClientParams } from './domain/interfaces/repositories/IClientRepository';

describe('ClientRepository', () => {
	const clientRepo: ClientRepository = new ClientRepository();
	// beforeAll(() => {
	// 	// Configuração antes dos testes
	// 	clientRepo = container.resolve<ClientRepository>('ClientRepository');
	// });
	describe('getById', () => {
		it('deve retornar um cliente existente', async () => {
			// Given
			const clientId = '123';

			// When
			const client = await clientRepo.findById(clientId);

			// Then
			expect(!!client).toBeTruthy();
			expect(client!.id).toEqual(clientId);
		});

		it('deve retornar null para um cliente inexistente', async () => {
			// Given
			const clientId = '999'; // ID de cliente que não existe

			// When
			const client = await clientRepo.findById(clientId);

			// Then
			expect(client).toBeNull();
		});
	});

	describe('getAll', () => {
		it('deve retornar uma lista de clientes', async () => {
			// When
			const clients = await clientRepo.list();

			// Then
			expect(clients).toBe('array');
		});

		// Outros testes para getAll
	});

	describe('create', () => {
		it('deve criar um novo cliente', async () => {
			// Given
			const newClient: CreateClientParams = {
				name: 'Novo Cliente',
				email: 'a@b.com',
				cpf: '12345678911',
			};

			// When
			const client = await clientRepo.createClient(newClient);

			// Then
			const createdClient = await clientRepo.findById(client.id);
			expect(!!createdClient).toBeTruthy();
			expect(createdClient!.name).toEqual(newClient.name);
		});
	});
});
