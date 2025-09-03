import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateQuizzesTable1756934341855 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createTable(
                new Table({
                    name: "quizzes",
                    columns: [
                        ...require("./helpers/audit-columns").baseColumns(),
                        {
                            name: "question",
                            type: "varchar",
                            isNullable: false,
                        },
                        {
                            name: "options",
                            type: "text",
                            isNullable: false,
                        },
                        {
                            name: "correctAnswer",
                            type: "varchar",
                            isNullable: false,
                        },
                        {
                            name: "userScore",
                            type: "numeric",
                            precision: 5,
                            scale: 2,
                            isNullable: true,
                        },
                        {
                            name: "isCompleted",
                            type: "boolean",
                            default: false,
                            isNullable: false,
                        },
                        {
                            name: "contentId",
                            type: "int",
                            isNullable: true,
                        },
                        {
                            name: "userId",
                            type: "int",
                            isNullable: true,
                        },
                    ],
                }),
                true // optional: ensures table is created if not exists
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("quizzes");
    }
}
