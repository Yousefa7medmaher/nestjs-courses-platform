import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProgramsTable1756934341854 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createTable(
                new Table({
                    name: "programs",
                    columns: [
                        ...require("./helpers/audit-columns").baseColumns(),
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
                    ],
                }),
                true // ensure it creates if not exists
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("programs");
    }
}
