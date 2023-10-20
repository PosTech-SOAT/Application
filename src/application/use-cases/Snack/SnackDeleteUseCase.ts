import { inject, injectable } from 'tsyringe';
import { ICategory } from '../../../domain/entities/CategoryEntity';
import { ISnackRepositoryPort } from '../../ports/ISnackRepositoryPort';

@injectable()
export default class SnackDeleteUseCase {
	constructor(
    @inject('SnackRepository')
    private snackRepository: ISnackRepositoryPort
	) {}

	async execute(id: string): Promise<ICategory> {
		return this.snackRepository.delete(id);
	}
}
