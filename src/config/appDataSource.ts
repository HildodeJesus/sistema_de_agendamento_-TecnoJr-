import { join } from 'path';
import { DataSource } from 'typeorm';

const appDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [join(__dirname, '..', 'entities/*.ts')],
  migrations: [join(__dirname, '..', 'database', 'migrations')],
  migrationsTableName: 'custom_migration_table',
  synchronize: true,
});

appDataSource
  .initialize()
  .then(() => console.log('Data source has been initialized!'));

export default appDataSource;
