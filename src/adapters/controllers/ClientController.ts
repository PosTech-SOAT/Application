import { Request, Response } from "express";
import { container } from "tsyringe";
import ClientCreateUseCase from "../../application/use-cases/ClientCreateUseCase";

export default class ClientController {

  async create(request: Request, response: Response) {
    const  { name, email, cpf } = request.body;

    const createClientUseCase = container.resolve(ClientCreateUseCase);

    const client = await createClientUseCase.execute({ name, email, cpf });

    return response.status(201).json(client);
  } 
}