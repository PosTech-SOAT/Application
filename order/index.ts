// ClientRepository.ts
export interface ClientRepository {
    getById(id: string): Promise<Client | null>;
    getAll(): Promise<Client[]>;
    create(client: Client): Promise<void>;
    update(client: Client): Promise<void>;
    delete(id: string): Promise<void>;
}

// CategoryRepository.ts
export interface CategoryRepository {
    getById(id: string): Promise<Category | null>;
    getAll(): Promise<Category[]>;
    create(category: Category): Promise<void>;
    update(category: Category): Promise<void>;
    delete(id: string): Promise<void>;
}

// ProductRepository.ts
export interface ProductRepository {
    getById(id: string): Promise<Product | null>;
    getAll(): Promise<Product[]>;
    create(product: Product): Promise<void>;
    update(product: Product): Promise<void>;
    delete(id: string): Promise<void>;
}

// OrderRepository.ts
export interface OrderRepository {
    getById(id: string): Promise<Order | null>;
    getAll(): Promise<Order[]>;
    create(order: Order): Promise<void>;
    update(order: Order): Promise<void>;
    delete(id: string): Promise<void>;
}

// PaymentRepository.ts
export interface PaymentRepository {
    processPayment(order: Order): Promise<boolean>;
}

import { container } from 'tsyringe';
import { ClientRepository } from '../ClientRepository';
import { CategoryRepository } from '../CategoryRepository';
import { OrderRepository } from '../OrderRepository';
import { ProductRepository } from '../ProductRepository';
import { PaymentRepository } from '../PaymentRepository';

container.register('ClientRepository', {
	useClass: ClientRepository,
});

container.register('CategoryRepository', {
	useClass: CategoryRepository,
});

container.register('ProductRepository', {
	useClass: ProductRepository,
});

container.register('OrderRepository', {
	useClass: OrderRepository,
});
container.register('PaymentRepository', {
	useClass: PaymentRepository,
});
