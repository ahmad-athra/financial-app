import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1768124805452 implements MigrationInterface {
    name = 'CreateUsersTable1768124805452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "passwordHash" character varying NOT NULL, "firstName" character varying(100) NOT NULL, "lastName" character varying(100) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "walletId" character varying(50) NOT NULL, "walletType" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_0a95e6aab86ff1b0278c18cf48e" UNIQUE ("walletId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
