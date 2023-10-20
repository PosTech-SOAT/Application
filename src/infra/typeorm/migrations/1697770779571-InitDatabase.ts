import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1697770779571 implements MigrationInterface {
    name = 'InitDatabase1697770779571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "cpf" character varying(11) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8dadaa0dc6305d95e1d1a6b9544" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Drinks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "description" character varying(255) NOT NULL, "price" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" uuid, CONSTRAINT "UQ_092d8e4235964fcc17f3774c5fa" UNIQUE ("name"), CONSTRAINT "PK_7a6e9fd6c3f8181811b52c2d78e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Accompaniment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "description" character varying(255) NOT NULL, "price" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" uuid, CONSTRAINT "UQ_f327505bbb0ebbb8dd62d3fc5cb" UNIQUE ("name"), CONSTRAINT "PK_43f67e1dafc4ed7d54fe79d9212" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."Orders_status_enum" AS ENUM('RECEBIDO', 'EM PREPARACAO', 'PRONTO', 'FINALIZADO')`);
        await queryRunner.query(`CREATE TABLE "Orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."Orders_status_enum" NOT NULL DEFAULT 'RECEBIDO', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "snackId" uuid, "accompanimentId" uuid, "drinkId" uuid, "clientId" uuid, CONSTRAINT "PK_ce8e3c4d56e47ff9c8189c26213" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Drinks" ADD CONSTRAINT "FK_c52ee26d38d36e28d305095b52e" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Accompaniment" ADD CONSTRAINT "FK_1be2900500b58525a6260c0c830" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Orders" ADD CONSTRAINT "FK_ff65b9ceea2e437a0a638eedbe3" FOREIGN KEY ("snackId") REFERENCES "Snacks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Orders" ADD CONSTRAINT "FK_41ce1b75f6363bf6f90935d8d2e" FOREIGN KEY ("accompanimentId") REFERENCES "Accompaniment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Orders" ADD CONSTRAINT "FK_5055a5b55bd5ad65275b78234b6" FOREIGN KEY ("drinkId") REFERENCES "Drinks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Orders" ADD CONSTRAINT "FK_2f1b0f9d985a2a60d798bf5e75e" FOREIGN KEY ("clientId") REFERENCES "Clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Orders" DROP CONSTRAINT "FK_2f1b0f9d985a2a60d798bf5e75e"`);
        await queryRunner.query(`ALTER TABLE "Orders" DROP CONSTRAINT "FK_5055a5b55bd5ad65275b78234b6"`);
        await queryRunner.query(`ALTER TABLE "Orders" DROP CONSTRAINT "FK_41ce1b75f6363bf6f90935d8d2e"`);
        await queryRunner.query(`ALTER TABLE "Orders" DROP CONSTRAINT "FK_ff65b9ceea2e437a0a638eedbe3"`);
        await queryRunner.query(`ALTER TABLE "Accompaniment" DROP CONSTRAINT "FK_1be2900500b58525a6260c0c830"`);
        await queryRunner.query(`ALTER TABLE "Drinks" DROP CONSTRAINT "FK_c52ee26d38d36e28d305095b52e"`);
        await queryRunner.query(`DROP TABLE "Orders"`);
        await queryRunner.query(`DROP TYPE "public"."Orders_status_enum"`);
        await queryRunner.query(`DROP TABLE "Accompaniment"`);
        await queryRunner.query(`DROP TABLE "Drinks"`);
        await queryRunner.query(`DROP TABLE "Clients"`);
    }

}
