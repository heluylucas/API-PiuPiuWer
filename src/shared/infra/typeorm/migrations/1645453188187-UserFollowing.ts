import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class UserFollowing1645453188187 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'users_following_users',
            columns: [
              {
                name: 'usersId_1',
                type: 'uuid',
                isPrimary: true,
              },
              {
                name: 'usersId_2',
                type: 'uuid',
                isPrimary: true,
    
              },
            ],
            foreignKeys: [
              {
                name: 'FollowingUser',
                columnNames: ['usersId_2'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
              },
              {
                name: 'FollowedUser',
                columnNames: ['usersId_1'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
    
              },
            ],
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users_following_users');
      }
    }
