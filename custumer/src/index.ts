import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { MongoDBConnection } from './data/data-sources/database/MongoDBConnection';

import './infra/controllers/container';
import router from './presentation';
import { configDotenv } from 'dotenv';
configDotenv();
export const app = express();
app.use(express.json());
app.use('/api', router);

async function startServer() {
	await MongoDBConnection.initConnection();
	app.listen(3001, () => {
		console.log('🔥 Customer service listening at http://localhost:3001');
		console.log(
			process.env.DB_HOST,
			process.env.DB_USER,
			process.env.DB_PASS,
			process.env.DB_NAME,
		);
	});
}

startServer().catch((error) => {
	console.error('Erro ao iniciar o servidor:', error);
});

module.exports = { app };
