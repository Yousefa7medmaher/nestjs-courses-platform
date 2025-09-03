import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class CreateLessonContentsTableFinal1756200011000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'lesson_contents',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'type',
                        type: 'enum',
                        enum: ['video', 'audio', 'pdf', 'text', 'quiz', 'assignment'],
                        isNullable: false,
                    },
                    {
                        name: 'contentURL',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'text',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'lessonId',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'videoId',
                        type: 'int',
                        isNullable: true,
                        isUnique: true,
                    },
                    {
                        name: 'quizId',
                        type: 'int',
                        isNullable: true,
                        isUnique: true,
                    },
                    {
                        name: 'assignmentId',
                        type: 'int',
                        isNullable: true,
                        isUnique: true,
                    },
                    ...require('./helpers/audit-columns').AuditColumns.get(),
                ],
            }),
            true,
        );

        // إنشاء الـ foreign keys
        await queryRunner.createForeignKey(
            'lesson_contents',
            new TableForeignKey({
                columnNames: ['lessonId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'lessons',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'lesson_contents',
            new TableForeignKey({
                columnNames: ['videoId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'videos',
                onDelete: 'SET NULL',
            }),
        );

        await queryRunner.createForeignKey(
            'lesson_contents',
            new TableForeignKey({
                columnNames: ['quizId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'quizzes',
                onDelete: 'SET NULL',
            }),
        );

        await queryRunner.createForeignKey(
            'lesson_contents',
            new TableForeignKey({
                columnNames: ['assignmentId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'assignments',
                onDelete: 'SET NULL',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('lesson_contents');

        if (table) {
            const foreignKeys = ['lessonId', 'videoId', 'quizId', 'assignmentId'];
            for (const col of foreignKeys) {
                const fk = table.foreignKeys.find(f => f.columnNames.indexOf(col) !== -1);
                if (fk) await queryRunner.dropForeignKey('lesson_contents', fk);
            }
        }

        await queryRunner.dropTable('lesson_contents');
    }
}
