// src/database/migrations/1756200002000-CreateProgramsTable.ts
import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { AuditColumns } from './helpers/audit-columns';

export class CreateProgramsTable1756200002000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'programs',
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
            name: 'imgURL',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          ...AuditColumns.get(),  
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('programs');
  }
}
