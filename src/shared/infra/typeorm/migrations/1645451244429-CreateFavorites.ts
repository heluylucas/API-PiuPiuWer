import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateFavorites1645451244429 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'users_favorites_pius',
            columns: [
              {
                name: 'usersId',
                type: 'uuid',
                isPrimary: true,
              },
              {
                name: 'piusId',
                type: 'uuid',
                isPrimary: true,
              },
            ],
            foreignKeys: [
              {
                name: 'User',
                columnNames: ['usersId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
              },
              {
                name: 'FavoritePiu',
                columnNames: ['piusId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'pius',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
              },
            ],
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users_favorites_pius');
      }
    }
