import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ProductCreateUseCase from '../../domain/use-cases/Product/ProductCreateUseCase';
import ProductListUseCase from '../../domain/use-cases/Product/ProductListUseCase';
import ProductFindOneUseCase from '../../domain/use-cases/Product/ProductFindOneUseCase';
import ProductListByCategoryUseCase from '../../domain/use-cases/Product/ProductListByCategoryUseCase';
import ProductUpdateUseCase from '../../domain/use-cases/Product/ProductUpdateUseCase';
import { UpdateProductParams } from '../../domain/interfaces/repositories/IProductRespository';
import ProductDeleteUseCase from '../../domain/use-cases/Product/ProductDeleteUseCase';

export default class ProductController {
	async create(request: Request, response: Response) {
		if (!request.body.name) {
			return response.status(400).json({ message: 'Missing required data' });
		}
		const createProductUseCase = container.resolve(ProductCreateUseCase);
		try {
			await createProductUseCase.execute(request.body);

			return response.status(201).json({ message: 'Product created successfully' });
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async list(request: Request, response: Response) {
		const listProductUseCase = container.resolve(ProductListUseCase);
		try {
			const Products = await listProductUseCase.execute();

			return response.status(200).json(Products);
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async findById(request: Request, response: Response) {

		const findOneProductUseCase = container.resolve(ProductFindOneUseCase);
		try {
			const Product = await findOneProductUseCase.execute(request.params.id);

			return response.status(200).json(Product);
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async findAllByCategory(request: Request, response: Response) {

		const findProductListByCategoryUseCase = container.resolve(ProductListByCategoryUseCase);
		try {
			const Product = await findProductListByCategoryUseCase.execute(request.params.id);

			return response.status(200).json(Product);
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async update(request: Request, response: Response) {

		const productUpdateUseCase = container.resolve(ProductUpdateUseCase);
		try {
			await productUpdateUseCase.execute({id: request.params.id, body: request.body as Partial<UpdateProductParams> });

			return response.status(200).json({ message: 'Product updated successfully' });
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

	async delete(request: Request, response: Response) {

		const deleteProductUseCase = container.resolve(ProductDeleteUseCase);
		try {
			await deleteProductUseCase.execute(request.params.id);

			return response.status(200).json({ message: 'Product deleted successfully' });
		} catch (error: any) {
			return response.status(400).json({ message: error.message });
		}
	}

}
