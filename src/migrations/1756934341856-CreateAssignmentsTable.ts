import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAssignmentsTable1756934341856 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createTable(
                new Table({
                    name: "assignments",
                    columns: [
                        ...require("./helpers/audit-columns").baseColumns(),
                        {
                            name: "title",
                            type: "varchar",
                            isNullable: false,
                        },
                        {
                            name: "description",
                            type: "text",
                            isNullable: true,
                        },
                        {
                            name: "fileURL",
                            type: "text",
                            isNullable: true,
                        },
                        {
                            name: "dueDate",
                            type: "timestamp",
                            isNullable: true,
                        },
                    ],
                }),
                true // optional safeguard
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("assignments");
    }
}
