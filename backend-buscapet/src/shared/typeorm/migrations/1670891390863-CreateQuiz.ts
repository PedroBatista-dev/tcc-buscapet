import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateQuiz1670891390863 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'quiz',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'birth_date',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'marital_status',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'professional_activity',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'complement',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'district',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'state',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cep',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'profile_instragam',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'for_who',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'why_adopt',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'average_life',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'financial_conditions',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'QuizUser',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('quiz');
  }
}
