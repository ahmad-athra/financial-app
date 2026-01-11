import { UserEntity } from './src/users/infrastructure/persistence/orm/entities/user.entity';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'financial_app',
  entities: [UserEntity],
  migrations: ['src/migrations/*.ts'],
});
