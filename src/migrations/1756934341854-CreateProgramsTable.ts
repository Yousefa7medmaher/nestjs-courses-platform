import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { baseColumns } from "../common/helpers/base-columns";

export class CreateProgramsTable1756934341854 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const [idColumn, ...auditColumns] = baseColumns
            await queryRunner.createTable(
                new Table({
                    name: "programs",
                    columns: [ 
                        idColumn,
                        {
                            name: "title",
                            type: "varchar",
                            length: "255",
                            isNullable: false,
                        },
                        {
                            name: "description",
                            type: "text",
                            isNullable: true,
                        },
                        {
                            name: "imgURL",
                            type: "varchar",
                            length: "500",
                            isNullable: true,
                        },
                        ...auditColumns 
                    ],
                }),
                true // ensure it creates if not exists
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("programs");
    }
}
