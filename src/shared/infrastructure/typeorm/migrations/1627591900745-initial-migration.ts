import { MigrationInterface, QueryRunner } from 'typeorm'

export class initialMigration1627591900745 implements MigrationInterface {
  name = 'initialMigration1627591900745'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "cpf" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "accountId" uuid, CONSTRAINT "REL_42bba679e348de51a699fb0a80" UNIQUE ("accountId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fakeKey" character varying NOT NULL, "balance" double precision NOT NULL DEFAULT \'0\', "income" double precision NOT NULL DEFAULT \'0\', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TYPE "transactions_type_enum" AS ENUM(\'deposit\', \'rescue\', \'payment\', \'outgoingTransfer\', \'incomingTransfer\')')
    await queryRunner.query('CREATE TYPE "transactions_status_enum" AS ENUM(\'success\', \'failure\', \'scheduled\')')
    await queryRunner.query('CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "transactions_type_enum" NOT NULL, "status" "transactions_status_enum" NOT NULL DEFAULT \'success\', "fakeKey" character varying, "barCode" character varying, "description" character varying, "value" double precision NOT NULL, "accountId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))')
    await queryRunner.query('ALTER TABLE "users" ADD CONSTRAINT "FK_42bba679e348de51a699fb0a803" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "transactions" ADD CONSTRAINT "FK_26d8aec71ae9efbe468043cd2b9" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "transactions" DROP CONSTRAINT "FK_26d8aec71ae9efbe468043cd2b9"')
    await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "FK_42bba679e348de51a699fb0a803"')
    await queryRunner.query('DROP TABLE "transactions"')
    await queryRunner.query('DROP TYPE "transactions_status_enum"')
    await queryRunner.query('DROP TYPE "transactions_type_enum"')
    await queryRunner.query('DROP TABLE "accounts"')
    await queryRunner.query('DROP TABLE "users"')
  }
}
