// src/database/migrations/1756200004000-CreateCoursesTable.ts
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { AuditColumns } from './helpers/audit-columns';

export class CreateCoursesTable1756200004000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'courses',
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
            name: 'thumbnailURL',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'instructorId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'programId',
            type: 'int',
            isNullable: true,
          },
          ...AuditColumns.get(), 
        ],
      }),
      true,
    );

    // Create foreign key for instructor
    await queryRunner.createForeignKey(
      'courses',
      new TableForeignKey({
        columnNames: ['instructorId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
      }),
    );

    // Create foreign key for program
    await queryRunner.createForeignKey(
      'courses',
      new TableForeignKey({
        columnNames: ['programId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'programs',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('courses');

    if (table) {
      // Drop foreign keys
      const instructorForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('instructorId') !== -1);
      const programForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('programId') !== -1);

      if (instructorForeignKey) {
        await queryRunner.dropForeignKey('courses', instructorForeignKey);
      }

      if (programForeignKey) {
        await queryRunner.dropForeignKey('courses', programForeignKey);
      }
    }

    await queryRunner.dropTable('courses');
  }
}
