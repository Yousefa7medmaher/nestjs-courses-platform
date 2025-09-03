import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateLessonsTable1756934341859 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createTable(
                new Table({
                    name: "lessons",
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
                            name: "order",
                            type: "int",
                            isNullable: false,
                        },
                        {
                            name: "coverImageURL",
                            type: "varchar",
                            length: "500",
                            isNullable: true,
                        },
                        {
                            name: "courseId",
                            type: "int",
                            isNullable: true,
                        },
                    ],
                }),
                true // optional safeguard
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("lessons");
    }
}
