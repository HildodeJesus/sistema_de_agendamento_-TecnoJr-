import { Module } from '@nestjs/common';

import { AccountModule } from './UseCases/Account/account.module';
import rateLimitConfig from './config/rateLimiting.config';
import envConfig from './config/env.config';
import queues from './queues';
import bullConfig from './config/bull.config';

@Module({
  imports: [AccountModule, rateLimitConfig, envConfig, bullConfig, queues],
  controllers: [],
  providers: [],
})
export class AppModule {}
