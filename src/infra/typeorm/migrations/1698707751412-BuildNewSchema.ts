import { MigrationInterface, QueryRunner } from 'typeorm';

export class BuildNewSchema1698707751412 implements MigrationInterface {
	name = 'BuildNewSchema1698707751412';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "Products" DROP CONSTRAINT "UQ_26c9336d231c4e90419a5954bd7"');
		await queryRunner.query('ALTER TABLE "Products" DROP COLUMN "name"');
		await queryRunner.query('ALTER TABLE "Products" ADD "name" character varying(25) NOT NULL');
		await queryRunner.query('ALTER TABLE "Products" ADD CONSTRAINT "UQ_26c9336d231c4e90419a5954bd7" UNIQUE ("name")');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "Products" DROP CONSTRAINT "UQ_26c9336d231c4e90419a5954bd7"');
		await queryRunner.query('ALTER TABLE "Products" DROP COLUMN "name"');
		await queryRunner.query('ALTER TABLE "Products" ADD "name" character varying(255) NOT NULL');
		await queryRunner.query('ALTER TABLE "Products" ADD CONSTRAINT "UQ_26c9336d231c4e90419a5954bd7" UNIQUE ("name")');
	}

}
