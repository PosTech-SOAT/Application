import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSnack1697599978948 implements MigrationInterface {
    name = 'CreateSnack1697599978948'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Snacks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "description" character varying(255) NOT NULL, "price" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" uuid, CONSTRAINT "UQ_1d7f0d230c4fee217b2d4e9aa16" UNIQUE ("name"), CONSTRAINT "PK_32c299b0466a5ad5639477d8791" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Snacks" ADD CONSTRAINT "FK_1e7b476d437ddd5324ea8fe405c" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Snacks" DROP CONSTRAINT "FK_1e7b476d437ddd5324ea8fe405c"`);
        await queryRunner.query(`DROP TABLE "Snacks"`);
    }

}
