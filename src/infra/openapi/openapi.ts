import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    info: {
      title: 'PosTech-3SOAT',
      version: '1.0.0',
      description: 'Descrição da API',
    },
  },
  apis: ["./src/infra/http/routes/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
