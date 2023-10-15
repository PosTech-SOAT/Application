import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateClient1697383477092 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE clients (
                id varchar(36) NOT NULL PRIMARY KEY,
                name varchar(255) NOT NULL,
                email varchar(255) NOT NULL,
                cpf varchar(11) NOT NULL,
                createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE clients
        `)
    }

}
