import { Request, Response } from "express";
import { container } from "tsyringe";
import DrinkDeleteUseCase from "../../application/use-cases/Drink/DrinkDeleteUseCase";
import DrinkListUseCase from "../../application/use-cases/Drink/DrinkListUseCase";
import DrinkCreateUseCase from "../../application/use-cases/Drink/DrinkCreateUseCase";
import DrinkFindOneUseCase from "../../application/use-cases/Drink/DrinkFindOneUseCase";

export default class DrinkController {
  async create(request: Request, response: Response) {
      if (!request.body.name) {
          return response.status(400).json({ message: "Missing required data" })
      }
      const createDrinkUseCase = container.resolve(DrinkCreateUseCase)
      try {
        await createDrinkUseCase.execute(request.body)

        return response.status(201).json({ message: "Drink created successfully" })
      } catch (error: any) {
        return response.status(400).json({ message: error.message })
      }
  }

  async list(request: Request, response: Response) {
    const listDrinkUseCase = container.resolve(DrinkListUseCase)
    try {
      const Drinks = await listDrinkUseCase.execute()

      return response.status(200).json(Drinks)
    } catch (error: any) {
      return response.status(400).json({ message: error.message })
    }
  }

  async findById(request: Request, response: Response) {

    const findOneDrinkUseCase = container.resolve(DrinkFindOneUseCase)
    try {
      const Drink = await findOneDrinkUseCase.execute(request.params.id)

      return response.status(200).json(Drink)
    } catch (error: any) {
      return response.status(400).json({ message: error.message })
    }
  }

  async delete(request: Request, response: Response) {

    const deleteDrinkUseCase = container.resolve(DrinkDeleteUseCase)
    try {
      await deleteDrinkUseCase.execute(request.params.id)

      return response.status(204).json({ message: "Drink deleted successfully" })
    } catch (error: any) {
      return response.status(400).json({ message: error.message })
    }
  }

}