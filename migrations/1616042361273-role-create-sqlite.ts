import {MigrationInterface, QueryRunner} from "typeorm";

export class roleCreateSqlite1616042361273 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("insert into role (name) values ('admin');")
        queryRunner.query("insert into role (name) values ('consultant');")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("delete from role;")
    }

}
