import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { baseColumns } from "../common/helpers/base-columns";

export class CreateAssignmentsTable1756934341856 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const [idColumn , ...auditColumns] = baseColumns ;
            await queryRunner.createTable(
                new Table({
                    name: "assignments",
                    columns: [
                        idColumn ,
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
                        ...auditColumns
                    ],
                }),
                true // optional safeguard
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("assignments");
    }
}
