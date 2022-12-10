import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateVaccinesAnimals1670696648674 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vaccines_animals',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'vaccine_id',
            type: 'uuid',
          },
          {
            name: 'animal_id',
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
            name: 'VaccinesAnimalsVaccine',
            referencedTableName: 'vaccines',
            referencedColumnNames: ['id'],
            columnNames: ['vaccine_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'VaccinesAnimalsAnimal',
            referencedTableName: 'animals',
            referencedColumnNames: ['id'],
            columnNames: ['animal_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vaccines_animals');
  }
}
