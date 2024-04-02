import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

import { AccountModule } from './UseCases/Account/account.module';
import rateLimitConfig from './config/rateLimiting.config';

@Module({
  imports: [AccountModule, ThrottlerModule.forRoot([rateLimitConfig])],
  controllers: [],
  providers: [],
})
export class AppModule {}
