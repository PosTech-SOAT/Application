import 'reflect-metadata';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerFile from './infra/openapi/openapi.json';

import './infra/controllers/container';
import router from './presentation';

const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/api', router);

app.listen(3000, () => {
	console.log('🔥 Server listening at http://localhost:3000/api-docs');
	console.log(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME);
});
