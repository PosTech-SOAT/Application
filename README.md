# Tech Challenge - PosTech-3SOAT - FIAP

Projeto de um Sistema de Controle de pedidos em desenvolvimento durante a Pós-graduação em Arquitetura de Software da FIAP.



## Tecnologias Utilizadas:

- [NodeJs](https://nodejs.org/en/docs)
- [Express](https://expressjs.com/pt-br/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://docs.docker.com/)

## Executando o projeto localmente:


Para a execução do projeto, as seguintes dependências precisão ser satifeitas,
- [Docker](https://docs.docker.com/get-docker/).
- [NodeJS](https://nodejs.org/en), Versão: 18.x ou superior.


## Executando os Microsserviços

Este repositório contém três microsserviços: `customer`, `order` e `payment`, cada microsserviço deve ser executado individualmente usando Docker Compose. Siga as instruções abaixo para iniciar cada um deles.
Vamos utilizar o microsserviço "customer" para o passo a passo, mas pode ser aplicado para qualquer microsserviço.


## Repositórios individuais:
- Customer:  https://github.com/PosTech-SOAT/Customer
- Order:  https://github.com/PosTech-SOAT/Order
- Payment:  https://github.com/PosTech-SOAT/Payment




## Instalação do Projeto:
Fazer o clone e ir na pasta do projeto:

```sh
git clone https://github.com/PosTech-SOAT/Customer
cd Application/customer
```

Instalar as dependências do projeto:

```sh
yarn install
```
ou

```sh
npm install
```

Subir os contâineres usando o arquivo docker-compose.yml:

```sh
docker compose up -d
```

Verificar se subiram os containeres:

```sh
docker ps
```

## Documentação da API
Acessar api pelo navegador:

## URL Custumer
```sh
http://localhost:3001/api
```

## URL Order
```sh
http://localhost:3002/api-docs
```

## URL Order
```sh
http://localhost:3000/api-docs
```

## Deploy de Microsserviços na Nuvem (AWS)

**Criação da infraestrutura na nuvem (AWS)**

A infraestrutura necessária para executar esses serviços na nuvem é gerenciada por uma pipeline automatizada no GitHub Actions utilizando o reposiório [Infra](https://github.com/PosTech-SOAT/Infra), que contém os scripts Terraform para criação da infraestrutura na AWS. 

### Configuração das Credenciais no Repositório "Infra"

1. **Acesse as configurações do repositório "Infra" no GitHub:**

   Vá para `Settings > Secrets and variables > Actions > Repository secrets`.

2. **Crie um novo segredo para as credenciais da AWS:**

   Clique em `New Repository Secret` e adicione o seguinte segredo:

   - **Nome:** `AWS_CREDENTIALS`
   - **Valor:**
     ```
     [default]
     aws_access_key_id=YOUR_AWS_ACCESS_KEY_ID
     aws_secret_access_key=YOUR_AWS_SECRET_ACCESS_KEY
     aws_session_token=YOUR_AWS_SESSION_TOKEN
     ```

3. **Crie um novo segredo para o token do Terraform:**

   Clique em `New Repository Secret` e adicione o seguinte segredo:

   - **Nome:** `TF_API_TOKEN`
   - **Valor:** Seu token de API do Terraform.

**Certifique-se de iniciar a pipeline para criação da infraestrutura.**

# Deploy de Microsserviços na Nuvem (AWS)

## Configuração das Credenciais para o GitHub Actions

Para realizar o deploy automatico do microsserviço, é necessario configurar algumas secrets no seu respectivo repositório (realizar a criação das secrets no repositório do microsserviço.)

1. **Acesse as configurações do repositório no GitHub:**

   Vá para `Settings > Secrets and variables > Actions > Repository secrets`.

2. **Crie um novo segredo para as credenciais da AWS:**

   Clique em `New Repository Secret` e adicione o seguinte segredo:

   - **Nome:** `AWS_CREDENTIALS`
   - **Valor:**
     ```
     [default]
     aws_access_key_id=YOUR_AWS_ACCESS_KEY_ID
     aws_secret_access_key=YOUR_AWS_SECRET_ACCESS_KEY
     aws_session_token=YOUR_AWS_SESSION_TOKEN
     ```

3. **Crie um novo segredo para o login no Docker Hub:**

   - **Nome:** `DOCKER_USERNAME`
   - **Valor:** Seu nome de usuário no Docker Hub.

   - **Nome:** `DOCKER_PASSWORD`
   - **Valor:** Sua senha no Docker Hub.

Após configurar esses segredos, a pipeline do GitHub Actions estará pronta para fazer o deploy automático do microsserviço na AWS.

**Certifique-se de iniciar a pipeline  na aba `Actions` no seu repositório GitHub.**

---

**Nota:** Certifique-se de substituir `YOUR_AWS_ACCESS_KEY_ID`, `YOUR_AWS_SECRET_ACCESS_KEY` e `YOUR_AWS_SESSION_TOKEN` com suas credenciais reais da AWS.



