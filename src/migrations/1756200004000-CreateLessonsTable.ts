import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { AuditColumns } from './helpers/audit-columns';

export class CreateLessonsTable1756200005000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'lessons',
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
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'order',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'coverImageURL',
                        type: 'varchar',
                        length: '500',
                        isNullable: true,
                    },
                    {
                        name: 'courseId',
                        type: 'int',
                        isNullable: true,
                    },
                    ...AuditColumns.get(),
                ],
            }),
            true,
        );

        // Create foreign key for course
        await queryRunner.createForeignKey(
            'lessons',
            new TableForeignKey({
                columnNames: ['courseId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'courses',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('lessons');

        if (table) {
            // Drop foreign key
            const courseForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('courseId') !== -1);

            if (courseForeignKey) {
                await queryRunner.dropForeignKey('lessons', courseForeignKey);
            }
        }

        await queryRunner.dropTable('lessons');
    }
}