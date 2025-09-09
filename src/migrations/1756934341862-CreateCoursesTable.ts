import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { baseColumns } from "../common/helpers/base-columns";
import { audit } from "rxjs";

export class CreateCoursesTable1756934341862 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const [idColumn , ...auditColumns ] = baseColumns ;
            await queryRunner.createTable(
                new Table({
                    name: "courses",
                    columns: [
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
                        ...auditColumns
                    ],
                }),
                true // optional safeguard
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("courses");
    }
}
