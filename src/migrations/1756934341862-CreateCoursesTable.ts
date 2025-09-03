import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCoursesTable1756934341862 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createTable(
                new Table({
                    name: "courses",
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
                            name: "thumbnailURL",
                            type: "varchar",
                            length: "500",
                            isNullable: true,
                        },
                        {
                            name: "instructorId",
                            type: "int",
                            isNullable: true,
                        },
                        {
                            name: "programId",
                            type: "int",
                            isNullable: true,
                        },
                    ],
                }),
                true // optional safeguard
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("courses");
    }
}
