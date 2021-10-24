import {MigrationInterface, QueryRunner} from "typeorm";

export class userCreateSqlite1616042368033 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`insert into "user" (name,email,password) values ('admin','admin@gmail.com','admin');`);
        await queryRunner.query(`insert into "user" (name,email,password) values ('consultant','consultant@gmail.com','consultant');`);
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("delete from user;")
    }

}
