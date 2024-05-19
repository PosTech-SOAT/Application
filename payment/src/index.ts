import 'reflect-metadata';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerFile from './infra/openapi/openapi.json';

import './infra/controllers/container';
import router from './presentation';
import { configDotenv } from 'dotenv';

configDotenv();
const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/api', router);

app.listen(3002, () => {
	console.log('🔥 Server listening at http://localhost:3002/api-docs');
	console.log(process.env.ML_PUBLIC_KEY, process.env.ML_ACCESS_TOKEN);
});
