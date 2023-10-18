import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategory1697593733477 implements MigrationInterface {
    name = 'CreateCategory1697593733477'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(25) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9004ab74b495518b3dee4f4222a" UNIQUE ("name"), CONSTRAINT "PK_537b5c00afe7427c4fc9434cd59" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Categories"`);
    }

}
