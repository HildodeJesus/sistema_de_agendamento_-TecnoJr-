import { Module } from '@nestjs/common';

import { UserModule } from './UseCases/users/user.module';
import rateLimitConfig from './config/rateLimiting.config';
import nestConfig from './config/nest.config';
import typeOrmConfig from './config/typeOrm.config';
import { AuthModule } from './UseCases/auth/auth.module';

@Module({
  imports: [nestConfig, rateLimitConfig, typeOrmConfig, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
