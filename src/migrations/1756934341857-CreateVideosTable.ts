import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { baseColumns } from "../common/helpers/base-columns";

export class CreateVideosTable1756934341857 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const [ idColumn , ...auditColumns ] = baseColumns ;

            await queryRunner.createTable(
                new Table({
                    name: "videos",
                    columns: [   
                        idColumn ,
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
                        ...baseColumns 
                    ],
                }),
                true // optional: ensures table creation if not exists
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("videos");
    }
}
