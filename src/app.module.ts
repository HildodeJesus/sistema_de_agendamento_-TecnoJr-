import { Module } from '@nestjs/common';

import { UserModule } from './UseCases/users/user.module';
import rateLimitConfig from './config/rateLimiting.config';
import nestConfig from './config/nest.config';
import typeOrmConfig from './config/typeOrm.config';
import { AuthModule } from './UseCases/auth/auth.module';
import { EstablishmentModule } from './UseCases/establishment/establishment.module';
import { CategoryModule } from './UseCases/category/category.module';
import { ScheduleModule } from './UseCases/schedules/schedules.module';
import { RolesModule } from './UseCases/roles/roles.module';

@Module({
  imports: [
    nestConfig,
    rateLimitConfig,
    typeOrmConfig,
    AuthModule,
    UserModule,
    EstablishmentModule,
    CategoryModule,
    ScheduleModule,
    RolesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
