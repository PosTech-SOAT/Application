import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOrderSchema1698202660617 implements MigrationInterface {
    name = 'UpdateOrderSchema1698202660617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders_products_products" ("ordersId" uuid NOT NULL, "productsId" uuid NOT NULL, CONSTRAINT "PK_9a16b87f8bea57750b1bca044ab" PRIMARY KEY ("ordersId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dbab812991c32a735a34748370" ON "orders_products_products" ("ordersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_af9cb00de5ab2af01a6a325343" ON "orders_products_products" ("productsId") `);
        await queryRunner.query(`ALTER TABLE "orders_products_products" ADD CONSTRAINT "FK_dbab812991c32a735a34748370c" FOREIGN KEY ("ordersId") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "orders_products_products" ADD CONSTRAINT "FK_af9cb00de5ab2af01a6a3253435" FOREIGN KEY ("productsId") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders_products_products" DROP CONSTRAINT "FK_af9cb00de5ab2af01a6a3253435"`);
        await queryRunner.query(`ALTER TABLE "orders_products_products" DROP CONSTRAINT "FK_dbab812991c32a735a34748370c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_af9cb00de5ab2af01a6a325343"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dbab812991c32a735a34748370"`);
        await queryRunner.query(`DROP TABLE "orders_products_products"`);
    }

}
