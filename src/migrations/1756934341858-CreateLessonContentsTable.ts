import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { baseColumns } from "../common/helpers/base-columns";

export class CreateLessonContentsTable1756934341858 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const [ idColumn , ...auditColumns] = baseColumns ;
            await queryRunner.createTable(
                new Table({
                    name: "lesson_contents",
                    columns: [
                        idColumn , 
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
                        ...auditColumns
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
