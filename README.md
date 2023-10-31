# Tech Challenge - PosTech-3SOAT - FIAP

Projeto de um Sistema de Controle de pedidos em desenvolvimento durante a Pós-graduação em Arquitetura de Software da FIAP.

## Tecnologias:

- [NodeJs](https://nodejs.org/en/docs)
- [Express](https://expressjs.com/pt-br/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://docs.docker.com/?_gl=1*1xw1zkg*_ga*NzIyMTM4ODIxLjE2OTg2MTk0MTQ.*_ga_XJWPQMJYHQ*MTY5ODYxOTQxNC4xLjEuMTY5ODYxOTQxNC42MC4wLjA.)


## Instalação do Projeto:
Fazer o clone e ir na pasta do projeto (por exemplo: tech-challenge-3soat-fiap):

```sh
cd tech-challenge-3soat-fiap
```

Subir os contâineres do Node e do PostgreSQL usando o arquivo docker-compose.yml:

```sh
docker compose up
```

Verificar se subiram os containeres **postech-3soat-app** e **database_postech**:

```sh
docker ps
```

Rodar migrations:

```sh
yarn migration:run
```

## Documentação da API
Acessar pelo navegador a url:

```sh
http://localhost:3000/api-docs
```
