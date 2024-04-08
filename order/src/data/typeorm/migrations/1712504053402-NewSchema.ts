import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewSchema1712504053402 implements MigrationInterface {
	name = 'NewSchema1712504053402';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('CREATE TYPE "public"."Orders_status_enum" AS ENUM(\'AGUARDANDO_PAGAMENTO\', \'RECEBIDO\', \'EM_PREPARO\', \'PRONTO\', \'FINALIZADO\')');
		await queryRunner.query('CREATE TABLE "Orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."Orders_status_enum" NOT NULL DEFAULT \'AGUARDANDO_PAGAMENTO\', "clientId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ce8e3c4d56e47ff9c8189c26213" PRIMARY KEY ("id"))');
		await queryRunner.query('CREATE TABLE "Orders_Products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "productId" uuid, "orderId" uuid, CONSTRAINT "PK_ded71cf7e8ebd4c628c673985b2" PRIMARY KEY ("id"))');
		await queryRunner.query('CREATE TABLE "Products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(25) NOT NULL, "description" character varying NOT NULL, "price" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" uuid, CONSTRAINT "UQ_26c9336d231c4e90419a5954bd7" UNIQUE ("name"), CONSTRAINT "PK_36a07cc432789830e7fb7b58a83" PRIMARY KEY ("id"))');
		await queryRunner.query('CREATE TABLE "Categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9004ab74b495518b3dee4f4222a" UNIQUE ("name"), CONSTRAINT "PK_537b5c00afe7427c4fc9434cd59" PRIMARY KEY ("id"))');
		await queryRunner.query('ALTER TABLE "Orders_Products" ADD CONSTRAINT "FK_c3a50db413b9cbb5b124542078b" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
		await queryRunner.query('ALTER TABLE "Orders_Products" ADD CONSTRAINT "FK_0aa8b716b82b13e006670f9eb1c" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE');
		await queryRunner.query('ALTER TABLE "Products" ADD CONSTRAINT "FK_85fdee89fa67fcdce66863def29" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "Products" DROP CONSTRAINT "FK_85fdee89fa67fcdce66863def29"');
		await queryRunner.query('ALTER TABLE "Orders_Products" DROP CONSTRAINT "FK_0aa8b716b82b13e006670f9eb1c"');
		await queryRunner.query('ALTER TABLE "Orders_Products" DROP CONSTRAINT "FK_c3a50db413b9cbb5b124542078b"');
		await queryRunner.query('DROP TABLE "Categories"');
		await queryRunner.query('DROP TABLE "Products"');
		await queryRunner.query('DROP TABLE "Orders_Products"');
		await queryRunner.query('DROP TABLE "Orders"');
		await queryRunner.query('DROP TYPE "public"."Orders_status_enum"');
	}

}
