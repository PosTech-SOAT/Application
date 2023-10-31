# Tech Challenge - PosTech-3SOAT - FIAP

Projeto de um Sistema de Controle de pedidos em desenvolvimento durante a Pós-graduação em Arquitetura de Software da FIAP.

## Tecnologias Utilizadas:

- [NodeJs](https://nodejs.org/en/docs)
- [Express](https://expressjs.com/pt-br/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://docs.docker.com/)

## Dependencias:
Para a execução do projeto, as seguintes dependências precisão ser satifeitas,
- [Docker](https://docs.docker.com/get-docker/).
- [NodeJS](https://nodejs.org/en), Versão: 16.x ou superior.


## Instalação do Projeto:
Fazer o clone e ir na pasta do projeto:

```sh
git clone https://github.com/VitorDiToro/PosTech-3SOAT
cd PosTech-3SOAT
```

Instalar as dependências do projeto:

```sh
yarn install
```
**Nota 💡**
> 
> **_Caso não possua o Yarn instalado na sua máquina, pode proceder com a instalação via Npm._**
> 


Subir os contâineres do Node e do PostgreSQL usando o arquivo docker-compose.yml:

```sh
docker compose up
```

Verificar se subiram os containeres **postech-3soat-app** e **database_postech**:

```sh
docker ps
```

## Documentação da API
Acessar pelo navegador a url:

```sh
http://localhost:3000/api-docs
```
