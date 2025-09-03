import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProgramEnrollmentsTable1756200012000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'program_enrollments',
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
            name: 'completedAt',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'progressPercentage',
            type: 'decimal',
            precision: 5,
            scale: 2,
            default: 0.0,
          },
          {
            name: 'totalCourses',
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
            name: 'programId',
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
            columnNames: ['programId'],
            referencedTableName: 'programs',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
        indices: [
          {
            name: 'IDX_program_enrollments_user_program',
            columnNames: ['userId', 'programId'],
            isUnique: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('program_enrollments');
  }
}
