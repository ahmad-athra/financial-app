import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1768081258296 implements MigrationInterface {
    name = 'CreateUsersTable1768081258296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "walletType" character varying NOT NULL DEFAULT 'VISA'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "walletType"`);
    }

}
