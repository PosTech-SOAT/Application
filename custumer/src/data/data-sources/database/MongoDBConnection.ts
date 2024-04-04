import mongoose, { ConnectOptions } from 'mongoose';

export class MongoDBConnection {
	static async initConnection(): Promise<void> {
		try {
			await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
				useUnifiedTopology: true,
			} as ConnectOptions);
			console.log('Conexão com o MongoDB Atlas estabelecida com sucesso!');
		} catch (error) {
			console.error('Erro ao inicializar a conexão com o banco de dados:', error);
			throw error;
		}
	}
}
