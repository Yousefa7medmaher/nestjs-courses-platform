import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { baseColumns } from "../common/helpers/base-columns";

export class CreateProgramCertificatesTable1756934341863 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const [ idColumn , ...auditColumns] = baseColumns; 
            await queryRunner.createTable(
                new Table({
                    name: "Program-certificates",  
                    columns: [
                        idColumn,
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
                        ...auditColumns
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
