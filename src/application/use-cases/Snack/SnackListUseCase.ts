import { inject, injectable } from 'tsyringe';
import { ISnackRepositoryPort } from '../../ports/ISnackRepositoryPort';
import { ISnack } from '../../../domain/entities/SnackEntity';

@injectable()
export default class SnackListUseCase {
	constructor(
    @inject('SnackRepository')
    private snackRepository: ISnackRepositoryPort
	) {}

	async execute(): Promise<Array<ISnack>> {
		return (await this.snackRepository.list()).map((snack) => ({
			id: snack.id,
			name: snack.name,
			category: snack.category,
			description: snack.description,
			price: snack.price,
		}));
	}
}
