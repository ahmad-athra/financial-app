import { User } from './src/users/entities/user.entity';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'financial_app',
  entities: [User],
  migrations: ['src/migrations/*.ts'],
});