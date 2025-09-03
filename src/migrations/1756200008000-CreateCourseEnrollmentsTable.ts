import { MigrationInterface, QueryRunner, Table, Index } from 'typeorm';

export class CreateCourseEnrollmentsTable1756200011000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'course_enrollments',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'status',
                        type: 'enum',
                        enum: ['active', 'completed', 'dropped', 'suspended'],
                        default: `'active'`,
                    },
                    {
                        name: 'enrolledAt',
                        type: 'timestamp with time zone',
                        isNullable: false,
                    },
                    {
                        name: 'progressPercentage',
                        type: 'decimal',
                        precision: 5,
                        scale: 2,
                        default: 0.00,
                    },
                    {
                        name: 'completedLessons',
                        type: 'int',
                        default: 0,
                    },
                    {
                        name: 'totalLessons',
                        type: 'int',
                        default: 0,
                    },
                    {
                        name: 'notes',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'userId',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'courseId',
                        type: 'int',
                        isNullable: false,
                    },
                    ...require('./helpers/audit-columns').AuditColumns.get(),
                ],
                foreignKeys: [
                    {
                        columnNames: ['userId'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE',
                    },
                    {
                        columnNames: ['courseId'],
                        referencedTableName: 'courses',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE',
                    },
                ],
                indices: [
                    {
                        name: 'IDX_course_enrollments_user_course',
                        columnNames: ['userId', 'courseId'],
                        isUnique: true,
                    },
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('course_enrollments');
    }
}
