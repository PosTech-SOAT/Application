import { container } from 'tsyringe';
import { ClientRepository } from '../ClientRepository';

describe('ClientRepository', () => {
    let clientRepo: ClientRepository;

    before(() => {
        // Configuração antes dos testes
        clientRepo = container.resolve<ClientRepository>('ClientRepository');
    });

    describe('getById', () => {
        it('deve retornar um cliente existente', async () => {
            // Given
            const clientId = '123';

            // When
            const client = await clientRepo.getById(clientId);

            // Then
            expect(client).to.exist;
            expect(client!.id).to.equal(clientId);
        });

        it('deve retornar null para um cliente inexistente', async () => {
            // Given
            const clientId = '999'; // ID de cliente que não existe

            // When
            const client = await clientRepo.getById(clientId);

            // Then
            expect(client).to.be.null;
        });
    });

    describe('getAll', () => {
        it('deve retornar uma lista de clientes', async () => {
            // When
            const clients = await clientRepo.getAll();

            // Then
            expect(clients).to.be.an('array');
        });

        // Outros testes para getAll
    });

    describe('create', () => {
        it('deve criar um novo cliente', async () => {
            // Given
            const newClient: Client = { id: '456', name: 'Novo Cliente' };

            // When
            await clientRepo.create(newClient);

            // Then
            const createdClient = await clientRepo.getById(newClient.id);
            expect(createdClient).to.exist;
            expect(createdClient!.name).to.equal(newClient.name);
        });
    });
});
