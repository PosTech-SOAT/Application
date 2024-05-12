import { container } from 'tsyringe';
import { IPaymentRepository } from '../../../domain/interfaces/repositories/IPaymentRepository';
import { PaymentRepository } from '../../../domain/repositories/PaymentRepository';

container.registerSingleton<IPaymentRepository>('PaymentRepository', PaymentRepository);

