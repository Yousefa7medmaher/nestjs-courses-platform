import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateVideosTable1756934341857 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createTable(
                new Table({
                    name: "videos",
                    columns: [
                        ...require("./helpers/audit-columns").baseColumns(),
                        {
                            name: "title",
                            type: "varchar",
                            length: "255",
                            isNullable: false,
                        },
                        {
                            name: "videoURL",
                            type: "text",
                            isNullable: false,
                        },
                        {
                            name: "description",
                            type: "text",
                            isNullable: true,
                        },
                        {
                            name: "duration",
                            type: "int",
                            isNullable: true,
                        },
                        {
                            name: "thumbnailURL",
                            type: "varchar",
                            length: "500",
                            isNullable: true,
                        },
                    ],
                }),
                true // optional: ensures table creation if not exists
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("videos");
    }
}
