import axios from 'axios';
import { IClientRepository } from '../interfaces/repositories/IClientRepository';
import { CreateClientParamsDto } from '../../infra/dto/CreateClientParamsDto';
import { IClient } from '../../infra/entities/ClientEntity';

export class ClientRepository implements IClientRepository {
	async createClient(params: CreateClientParamsDto): Promise<IClient> {
		try {
			const response = await axios.post('http://postech_customer_container:3001/api/clients', params);
			return response.data;
		} catch (error) {
			console.error('Erro ao criar cliente:', error);
			throw error;
		}
	}

	async findByCPF(cpf: string): Promise<IClient | null> {
		try {
			const response = await axios.get(`http://postech_customer_container:3001/api/clients/${cpf}`);
			return response.data || null;
		} catch (error) {
			console.error('Erro ao buscar cliente por CPF:', error);
			throw error;
		}
	}


	async findById(id: string): Promise<IClient | null> {
		try {
			const response = await axios.get(`http://postech_customer_container:3001/api/clients/${id}`);
			return response.data || null;
		} catch (error) {
			console.error('Erro ao buscar cliente por ID:', error);
			throw error;
		}
	}

	async list(): Promise<IClient[]> {
		try {
			const response = await axios.get('http://postech_customer_container:3001/api/clients');
			return response.data;
		} catch (error) {
			console.error('Erro ao listar clientes:', error);
			throw error;
		}
	}

	async update(cpf: string, data: CreateClientParamsDto): Promise<void> {
		try {
			await axios.put(`http://postech_customer_container:3001/api/clients/${cpf}`, data);
		} catch (error) {
			console.error('Erro ao atualizar cliente:', error);
			throw error;
		}
	}
}
