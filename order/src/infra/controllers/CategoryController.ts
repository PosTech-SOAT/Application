import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CategoryCreateUseCase from '../../domain/use-cases/Category/CategoryCreateUseCase';
import CategoryListUseCase from '../../domain/use-cases/Category/CategoryListUseCase';
import CategoryFindOneUseCase from '../../domain/use-cases/Category/CategoryFindOneUseCase';
import CategoryDeleteUseCase from '../../domain/use-cases/Category/CategoryDeleteUseCase';
import CategoryUpdateUseCase from '../../domain/use-cases/Category/CategoryUpdateUseCase';

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

	async update(request: Request, response: Response) {

		const updateCategoryUseCase = container.resolve(CategoryUpdateUseCase);
		try {
			await updateCategoryUseCase.execute({id: request.params.id, params: request.body});

			return response.status(200).json({ message: 'Category updated successfully' });
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

}
