import { DataSource } from 'typeorm';
import { configDotenv } from 'dotenv';

configDotenv();

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: ['dist/**/infrastructure/**/*.entity.js'],
  migrationsTableName: 'migrations',
  migrations: ['./migrations/*.ts'],
  synchronize: true,
});
