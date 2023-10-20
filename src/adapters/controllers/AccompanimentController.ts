import { Request, Response } from "express";
import { container } from "tsyringe";
import AccompanimentDeleteUseCase from "../../application/use-cases/Accompaniment/AccompanimentDeleteUseCase";
import AccompanimentFindOneUseCase from "../../application/use-cases/Accompaniment/AccompanimentFindOneUseCase";
import AccompanimentListUseCase from "../../application/use-cases/Accompaniment/AccompanimentListUseCase";
import AccompanimentCreateUseCase from "../../application/use-cases/Accompaniment/AccompanimentCreateUseCase";


export default class AccompanimentController {
  async create(request: Request, response: Response) {
      if (!request.body.name) {
          return response.status(400).json({ message: "Missing required data" })
      }
      const createAccompanimentUseCase = container.resolve(AccompanimentCreateUseCase)
      try {
        await createAccompanimentUseCase.execute(request.body)

        return response.status(201).json({ message: "Accompaniment created successfully" })
      } catch (error: any) {
        return response.status(400).json({ message: error.message })
      }
  }

  async list(request: Request, response: Response) {
    const listAccompanimentUseCase = container.resolve(AccompanimentListUseCase)
    try {
      const Accompaniments = await listAccompanimentUseCase.execute()

      return response.status(200).json(Accompaniments)
    } catch (error: any) {
      return response.status(400).json({ message: error.message })
    }
  }

  async findById(request: Request, response: Response) {

    const findOneAccompanimentUseCase = container.resolve(AccompanimentFindOneUseCase)
    try {
      const Accompaniment = await findOneAccompanimentUseCase.execute(request.params.id)

      return response.status(200).json(Accompaniment)
    } catch (error: any) {
      return response.status(400).json({ message: error.message })
    }
  }

  async delete(request: Request, response: Response) {

    const deleteAccompanimentUseCase = container.resolve(AccompanimentDeleteUseCase)
    try {
      await deleteAccompanimentUseCase.execute(request.params.id)

      return response.status(204).json({ message: "Accompaniment deleted successfully" })
    } catch (error: any) {
      return response.status(400).json({ message: error.message })
    }
  }

}