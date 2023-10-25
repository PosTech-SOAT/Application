import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveOrderTotal1698201331211 implements MigrationInterface {
    name = 'RemoveOrderTotal1698201331211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Orders" DROP COLUMN "total"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Orders" ADD "total" double precision NOT NULL`);
    }

}
