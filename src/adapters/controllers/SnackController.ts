import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SnackCreateUseCase from '../../application/use-cases/Snack/SnackCreateUseCase';
import SnackListUseCase from '../../application/use-cases/Snack/SnackListUseCase';
import SnackFindOneUseCase from '../../application/use-cases/Snack/SnackFindOneUseCase';
import SnackDeleteUseCase from '../../application/use-cases/Snack/SnackDeleteUseCase';


export default class SnackController {
	async create(request: Request, response: Response) {
		if (!request.body.name) {
			return response.status(400).json({ message: 'Missing required data' });
		}
		const createSnackUseCase = container.resolve(SnackCreateUseCase);
		try {
			await createSnackUseCase.execute(request.body);

			return response.status(201).json({ message: 'Snack created successfully' });
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async list(request: Request, response: Response) {
		const listSnackUseCase = container.resolve(SnackListUseCase);
		try {
			const snacks = await listSnackUseCase.execute();

			return response.status(200).json(snacks);
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async findById(request: Request, response: Response) {

		const findOneSnackUseCase = container.resolve(SnackFindOneUseCase);
		try {
			const snack = await findOneSnackUseCase.execute(request.params.id);

			return response.status(200).json(snack);
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async delete(request: Request, response: Response) {

		const deleteSnackUseCase = container.resolve(SnackDeleteUseCase);
		try {
			await deleteSnackUseCase.execute(request.params.id);

			return response.status(204).json({ message: 'Snack deleted successfully' });
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

}
