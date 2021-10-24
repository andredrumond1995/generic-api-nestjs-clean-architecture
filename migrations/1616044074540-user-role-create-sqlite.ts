import {MigrationInterface, QueryRunner} from "typeorm";

export class userRoleCreateSqlite1616044074540 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const [adminUserId] = await queryRunner.query(`select id from "user" as u where u.email = 'admin@gmail.com';`)
        const [adminRoleId] = await queryRunner.query(`select id from role as r where r.name = 'admin';`)
        await queryRunner.query(`insert into "user_roles_role" 
                                ("userId", "roleId") VALUES (${adminUserId.id}, ${adminRoleId.id})`);
        const [consultantUserId] = await queryRunner.query(`select id from "user" as u where u.email = 'consultant@gmail.com';`)
        const [consultantRoleId] = await queryRunner.query("select id from role as r where r.name = 'consultant';")
        await queryRunner.query(`insert into "user_roles_role" 
                                ("userId", "roleId") VALUES (${consultantUserId.id}, ${consultantRoleId.id})`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("delete from user_roles_role;")
    }

}
