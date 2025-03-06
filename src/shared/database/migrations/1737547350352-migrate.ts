import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1737547350352 implements MigrationInterface {
    name = 'Migrate1737547350352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME COLUMN "username" TO "name"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" TO "UQ_065d4d8f3b5adb4a08841eae3c8"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" TO "UQ_78a916df40e02a9deb1c4b75edb"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME COLUMN "name" TO "username"
        `);
    }

}
