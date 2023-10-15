import { Request, Response } from "express";
import ClientCreateUseCase from "../../application/use-cases/ClientCreateUseCase";

export default class ClientController {
  constructor(private readonly clientCreateUseCase: ClientCreateUseCase) {}

  async create(request: Request, response: Response) {
    const { id, name, email, cpf } = request.body;
    const client = await this.clientCreateUseCase.execute({
      id,
      name,
      email,
      cpf,
    });
    return response.status(201).json(client);
  }
}