import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateClient1697383477092 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS clients (
                id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
                name varchar(255) NOT NULL,
                email varchar(255) NOT NULL,
                cpf varchar(255) NOT NULL,
                created_at timestamp NOT NULL DEFAULT now(),
                updated_at timestamp NOT NULL DEFAULT now()
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE clients`)
    }

}
