import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProgramCertificatesTable1756934341863 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createTable(
                new Table({
                    name: "Program-certificates",  
                    columns: [
                        ...require("./helpers/audit-columns").baseColumns(),
                        {
                            name: "certificateCode",
                            type: "varchar",
                            length: "255",
                            isNullable: false,
                        },
                        {
                            name: "issueDate",
                            type: "date",
                            isNullable: false,
                        },
                        {
                            name: "expiryDate",
                            type: "date",
                            isNullable: true,
                        },
                        {
                            name: "userId",
                            type: "int",
                            isNullable: true,
                        },
                    ],
                    uniques: [
                        { columnNames: ["certificateCode"] },
                    ],
                }),
                true // optional safeguard
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Program-certificates");
    }
}
