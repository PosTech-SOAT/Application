export class CreateClientParamsDto {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly cpf: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.cpf = cpf;
  }
}