import { inject, injectable } from 'tsyringe';
import { IOrderRepositoryPort } from '../../ports/IOrderRepositoryPort';
import { IOrder } from '../../../domain/entities/OrderEntity';


@injectable()
export default class OrderFindOneUseCase {
	constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepositoryPort
	) {}

	async execute(id: string): Promise<IOrder | null> {
		return this.orderRepository.findById(id);
	}
}
