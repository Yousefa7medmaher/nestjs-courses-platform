import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProgramEnrollmentsTable1756934341865 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createTable(
                new Table({
                    name: "program_enrollments",
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
                            isNullable: false,
                        },
                        {
                            name: "completedAt",
                            type: "timestamptz",
                            isNullable: true,
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
                            name: "totalCourses",
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
        await queryRunner.dropTable("program_enrollments");
    }
}
