import { container } from 'tsyringe';
import { ClientRepository } from '../ClientRepository';
import { CategoryRepository } from '../CategoryRepository';
import { OrderRepository } from '../OrderRepository';
import { ProductRepository } from '../ProductRepository';
import { PaymentRepository } from '../PaymentRepository';

describe('Injeção de Dependência', () => {
    describe('Registrando Repositórios', () => {
        it('deve registrar ClientRepository corretamente', () => {
            // Given
            const clientRepo = container.resolve<ClientRepository>('ClientRepository');

            // Then
            expect(clientRepo).to.be.instanceOf(ClientRepository);
        });

        it('deve registrar CategoryRepository corretamente', () => {
            // Given
            const categoryRepo = container.resolve<CategoryRepository>('CategoryRepository');

            // Then
            expect(categoryRepo).to.be.instanceOf(CategoryRepository);
        });

        it('deve registrar ProductRepository corretamente', () => {
            // Given
            const productRepo = container.resolve<ProductRepository>('ProductRepository');

            // Then
            expect(productRepo).to.be.instanceOf(ProductRepository);
        });

        it('deve registrar OrderRepository corretamente', () => {
            // Given
            const orderRepo = container.resolve<OrderRepository>('OrderRepository');

            // Then
            expect(orderRepo).to.be.instanceOf(OrderRepository);
        });

        it('deve registrar PaymentRepository corretamente', () => {
            // Given
            const paymentRepo = container.resolve<PaymentRepository>('PaymentRepository');

            // Then
            expect(paymentRepo).to.be.instanceOf(PaymentRepository);
        });
    });
});
