import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { baseColumns } from "../common/helpers/base-columns";
import { audit } from "rxjs";

export class CreateUsersTable1756934341864 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const [ idColumn , ...auditColumns ] = baseColumns ;
            await queryRunner.createTable(
                new Table({
                    name: "users",
                    columns: [
                            idColumn ,
                        {
                            name: "name",
                            type: "varchar",
                            length: "100",
                            isNullable: false,
                        },
                        {
                            name: "email",
                            type: "varchar",
                            isNullable: false,
                        },
                        {
                            name: "passwordHash",
                            type: "varchar",
                            isNullable: false,
                        },
                        {
                            name: "phoneNumber",
                            type: "varchar",
                            length: "20",
                            isNullable: true,
                        },
                        {
                            name: "avatarUrl",
                            type: "varchar",
                            isNullable: true,
                        },
                        {
                            name: "role",
                            type: "varchar",
                            default: "'student'", // Enum handled in entity
                            isNullable: false,
                        },
                        ...auditColumns
                    ],
                    uniques: [
                        { columnNames: ["email"] },
                    ],
                }),
                true // optional safeguard
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }
}
