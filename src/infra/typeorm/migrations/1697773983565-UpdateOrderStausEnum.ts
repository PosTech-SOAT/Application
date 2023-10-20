import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOrderStausEnum1697773983565 implements MigrationInterface {
    name = 'UpdateOrderStausEnum1697773983565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."Orders_status_enum" RENAME TO "Orders_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."Orders_status_enum" AS ENUM('RECEBIDO', 'EM_PREPARACAO', 'PRONTO', 'FINALIZADO')`);
        await queryRunner.query(`ALTER TABLE "Orders" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Orders" ALTER COLUMN "status" TYPE "public"."Orders_status_enum" USING "status"::"text"::"public"."Orders_status_enum"`);
        await queryRunner.query(`ALTER TABLE "Orders" ALTER COLUMN "status" SET DEFAULT 'RECEBIDO'`);
        await queryRunner.query(`DROP TYPE "public"."Orders_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Orders_status_enum_old" AS ENUM('RECEBIDO', 'EM PREPARACAO', 'PRONTO', 'FINALIZADO')`);
        await queryRunner.query(`ALTER TABLE "Orders" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Orders" ALTER COLUMN "status" TYPE "public"."Orders_status_enum_old" USING "status"::"text"::"public"."Orders_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "Orders" ALTER COLUMN "status" SET DEFAULT 'RECEBIDO'`);
        await queryRunner.query(`DROP TYPE "public"."Orders_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."Orders_status_enum_old" RENAME TO "Orders_status_enum"`);
    }

}
