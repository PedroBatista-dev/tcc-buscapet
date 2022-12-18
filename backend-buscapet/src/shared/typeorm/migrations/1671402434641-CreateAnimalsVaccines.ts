import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAnimalsVaccines1671402434641 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'animals_vaccines',
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
            name: 'AnimalsVaccinesVaccine',
            referencedTableName: 'vaccines',
            referencedColumnNames: ['id'],
            columnNames: ['vaccine_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'AnimalsVaccinesAnimal',
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
    await queryRunner.dropTable('animals_vaccines');
  }
}
