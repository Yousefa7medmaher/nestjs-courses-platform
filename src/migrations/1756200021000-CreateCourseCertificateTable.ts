import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateProgramCertificateTable1756200020000  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
     await queryRunner.createTable(
      new Table({
        name: 'certificates',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'certificateCode',
            type: 'varchar',
            length: '255',
            isUnique: true,
          },
          {
            name: 'userId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'courseEnrollmentId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'issueDate',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'expiryDate',
            type: 'date',
            isNullable: true,
          },
          ...require('./helpers/audit-columns').AuditColumns.get(),
        ],
      }),
      true,
    );
 
    await queryRunner.createForeignKey(
      'certificates',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  
    await queryRunner.createForeignKey(
      'certificates',
      new TableForeignKey({
        columnNames: ['courseEnrollmentId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'course_enrollments',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('certificates');
  }
}
