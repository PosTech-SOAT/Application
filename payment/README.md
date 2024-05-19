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
- [NodeJS](https://nodejs.org/en), Versão: 18.x ou superior.

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

> **_Caso não possua o Yarn instalado na sua máquina, pode proceder com a instalação via Npm._**

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

## Rodando o Kubernetes

Clique [aqui](https://kubernetes.io/docs/setup/) na documentação do Kubernetes para configurar e instalar o `kubectl` sua máquina.
Obs: Verifique qual tipo de cluster será usado e realize a configuração adequada da permissão das métricas do respectivo cluster.

e.g.: Para o cluster embarcado ao Docker Desktop, siga as instruções de configuração [aqui](https://github.com/kubernetes-sigs/metrics-server/releases).

Obs: Antes de executar o passo a passo de apply dos arquivos yaml, verifique se as métricas estão configuradas, com:

```
kubectl top node
```

ou

```
kubectl top pod -A
```

Execute o passo a passo:

```
kubectl apply -f postgres-deployment.yaml
```

Verifique se o pod do postgres está como running e pronto para receber conexões, com:

```
kubectl logs <nome-do-pod>
```

Em seguida, execute os mesmos passos para o arquivo `api-deployment.yaml`.
Na sequência, execute o comando de apply nos arquivos `hpa-api.yaml` e `hpa-postgres.yaml`, para habilitar o autoscaler dos pods.

Atenção! Poder ser necessário realizar um port forward para conseguir acessar localmente os serviços internos do cluster, portanto, execute:

```
kubectl port-forward pod/<nome-do-pod> <porta-externa>:<porta-interna-do-pod> &
```
