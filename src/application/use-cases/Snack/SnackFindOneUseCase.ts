import { inject, injectable } from 'tsyringe';
import { ICategory } from '../../../domain/entities/CategoryEntity';
import { ISnackRepositoryPort } from '../../ports/ISnackRepositoryPort';

@injectable()
export default class SnackFindOneUseCase {
	constructor(
    @inject('SnackRepository')
    private snackRepository: ISnackRepositoryPort
	) {}

	async execute(id: string): Promise<ICategory | null> {
		return this.snackRepository.findById(id);
	}
}
