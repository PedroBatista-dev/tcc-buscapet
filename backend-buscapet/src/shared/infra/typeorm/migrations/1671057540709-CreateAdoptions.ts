import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAdoptions1671057540709 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'adoptions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'animal_id',
            type: 'uuid',
          },
          {
            name: 'ong_id',
            type: 'uuid',
          },
          {
            name: 'adopter_id',
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
            name: 'AdoptionAnimal',
            referencedTableName: 'animals',
            referencedColumnNames: ['id'],
            columnNames: ['animal_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          {
            name: 'AdoptionOng',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['ong_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'AdoptionAdopter',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['adopter_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('adoptions');
  }
}
