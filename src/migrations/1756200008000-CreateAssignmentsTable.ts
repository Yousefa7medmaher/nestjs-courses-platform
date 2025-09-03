import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAssignmentsTable1756200008000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'assignments',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'fileURL',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'dueDate',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    ...require('./helpers/audit-columns').AuditColumns.get(),
                ],
            }),
            true,
        );


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('assignments');
    }
}
