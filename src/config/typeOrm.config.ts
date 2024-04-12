import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSourceOptions } from 'typeorm';
import { createDatabase } from 'typeorm-extension';

(async () => {
  const options: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  };
  await createDatabase({ ifNotExist: true, options: options });
})();

export default TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  autoLoadEntities: true,
  entities: [join(__dirname, '../', '/entities/*.entity.ts')],
  migrations: [join(__dirname, '..', 'database', 'migrations')],
  migrationsTableName: 'custom_migration_table',
  synchronize: true,
});
