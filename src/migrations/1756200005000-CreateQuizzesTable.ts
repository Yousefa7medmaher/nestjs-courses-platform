import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateQuizzesTable1756200007000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'quizzes',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'question',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'options',
                        type: 'text',
                        isNullable: false,
                        comment: 'JSON array of options',
                    },
                    {
                        name: 'correctAnswer',
                        type: 'varchar',
                        isNullable: false,
                    },

                ],
            }),
            true,
        );


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('quizzes');
    }
}
