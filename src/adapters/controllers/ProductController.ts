import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ProductCreateUseCase from '../../application/use-cases/Product/ProductCreateUseCase';

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

	// async list(request: Request, response: Response) {
	// 	const listProductUseCase = container.resolve(ProductListUseCase);
	// 	try {
	// 		const Products = await listProductUseCase.execute();

	// 		return response.status(200).json(Products);
	// 	} catch (error: any) {
	// 		return response.status(400).json({ message: error.message });
	// 	}
	// }

	// async findById(request: Request, response: Response) {

	// 	const findOneProductUseCase = container.resolve(ProductFindOneUseCase);
	// 	try {
	// 		const Product = await findOneProductUseCase.execute(request.params.id);

	// 		return response.status(200).json(Product);
	// 	} catch (error: any) {
	// 		return response.status(400).json({ message: error.message });
	// 	}
	// }

	// async changeProductStatus(request: Request, response: Response) {

	// 	const findOneProductUseCase = container.resolve(ProductUpdateStatusUseCase);
	// 	try {
	// 		await findOneProductUseCase.execute(request.params.id, request.query.status as ProductStatus);

	// 		return response.status(200).json({ message: 'Product updated successfully' });
	// 	} catch (error: any) {
	// 		return response.status(400).json({ message: error.message });
	// 	}
	// }

	// async delete(request: Request, response: Response) {

	// 	const deleteProductUseCase = container.resolve(ProductDeleteUseCase);
	// 	try {
	// 		await deleteProductUseCase.execute(request.params.id);

	// 		return response.status(200).json({ message: 'Product deleted successfully' });
	// 	} catch (error: any) {
	// 		return response.status(400).json({ message: error.message });
	// 	}
	// }

}
