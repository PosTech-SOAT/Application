import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CategoryCreateUseCase from '../../application/use-cases/Category/CategoryCreateUseCase';
import CategoryListUseCase from '../../application/use-cases/Category/CategoryListUseCase';
import CategoryFindOneUseCase from '../../application/use-cases/Category/CategoryFindOneUseCase';
import CategoryDeleteUseCase from '../../application/use-cases/Category/CategoryDeleteUseCase';

export default class CategoryController {
	async create(request: Request, response: Response) {
		const category = request.body;
		if (!category) {
			return response.status(400).json({ message: 'Missing required data' });
		}
		const createCategoryUseCase = container.resolve(CategoryCreateUseCase);
		try {
			await createCategoryUseCase.execute(category);

			return response.status(201).json({ message: 'Category created successfully' });
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async list(request: Request, response: Response) {
		const listCategoryUseCase = container.resolve(CategoryListUseCase);
		try {
			const categories = await listCategoryUseCase.execute();

			return response.status(200).json(categories);
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async findById(request: Request, response: Response) {
		const findOneCategoryUseCase = container.resolve(CategoryFindOneUseCase);
		try {
			const category = await findOneCategoryUseCase.execute(request.params.id);

			return response.status(200).json(category);
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async delete(request: Request, response: Response) {

		const deleteCategoryUseCase = container.resolve(CategoryDeleteUseCase);
		try {
			await deleteCategoryUseCase.execute(request.params.id);

			return response.status(204).json({ message: 'Category deleted successfully' });
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

}
