import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnTypeTableBanner1743053508115 implements MigrationInterface {
    name = 'AddColumnTypeTableBanner1743053508115'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "banner" ADD "type" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "banner" DROP COLUMN "type"`);
    }

}
