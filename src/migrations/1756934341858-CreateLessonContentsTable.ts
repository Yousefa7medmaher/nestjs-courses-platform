import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateLessonContentsTable1756934341858 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createTable(
                new Table({
                    name: "lesson_contents",
                    columns: [
                        ...require("./helpers/audit-columns").baseColumns(),
                        {
                            name: "type",
                            type: "varchar",
                            isNullable: false, // Enum handled in entity
                        },
                        {
                            name: "contentURL",
                            type: "text",
                            isNullable: true,
                        },
                        {
                            name: "text",
                            type: "text",
                            isNullable: true,
                        },
                        {
                            name: "lessonId",
                            type: "int",
                            isNullable: true,
                        },
                        {
                            name: "videoId",
                            type: "int",
                            isNullable: true,
                        },
                        {
                            name: "assignmentId",
                            type: "int",
                            isNullable: true,
                        },
                    ],
                    uniques: [
                        { columnNames: ["videoId"] },
                        { columnNames: ["assignmentId"] },
                    ],
                }),
                true // optional safeguard
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("lesson_contents");
    }
}
