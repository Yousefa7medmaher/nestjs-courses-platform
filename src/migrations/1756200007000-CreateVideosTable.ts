import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateVideosTable1756200009000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'videos',
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
                        name: 'videoURL',
                        type: 'text',
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'duration',
                        type: 'int',
                        isNullable: true,
                        comment: 'Duration in seconds',
                    },
                    {
                        name: 'thumbnailURL',
                        type: 'varchar',
                        length: '500',
                        isNullable: true,
                    },
                    ...require('./helpers/audit-columns').AuditColumns.get(),
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('videos');
    }
}
