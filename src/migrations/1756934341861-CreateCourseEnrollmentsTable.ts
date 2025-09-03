import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCourseEnrollmentsTable1756934341861 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createTable(
                new Table({
                    name: "course_enrollments",
                    columns: [
                        ...require("./helpers/audit-columns").baseColumns(),
                        {
                            name: "status",
                            type: "varchar",
                            default: "'active'", // Enum handled in entity
                            isNullable: false,
                        },
                        {
                            name: "enrolledAt",
                            type: "timestamptz",
                            default: "now()",
                            isNullable: false,
                        },
                        {
                            name: "progressPercentage",
                            type: "numeric",
                            precision: 5,
                            scale: 2,
                            default: "'0'",
                            isNullable: false,
                        },
                        {
                            name: "completedLessons",
                            type: "int",
                            default: "'0'",
                            isNullable: false,
                        },
                        {
                            name: "totalLessons",
                            type: "int",
                            default: "'0'",
                            isNullable: false,
                        },
                        {
                            name: "notes",
                            type: "text",
                            isNullable: true,
                        },
                        {
                            name: "userId",
                            type: "int",
                            isNullable: true,
                        },
                        {
                            name: "courseId",
                            type: "int",
                            isNullable: true,
                        },
                    ],
                    uniques: [
                        { columnNames: ["userId", "courseId"] },
                    ],
                }),
                true // optional safeguard
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("course_enrollments");
    }
}
