import mongoose from 'mongoose';

export class MongoDBConnection {
    static async initConnection(): Promise<void> {
        try {
            await mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
                authSource: 'admin',
            });
						console.log('url:', `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
            console.log('Conexão com o MongoDB estabelecida com sucesso!');
        } catch (error) {
            console.error('Erro ao inicializar a conexão com o banco de dados:', error);
            throw error;
        }
    }
}
