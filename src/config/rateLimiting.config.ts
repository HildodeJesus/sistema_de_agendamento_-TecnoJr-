import { ThrottlerModule, ThrottlerOptions } from '@nestjs/throttler';

const rateLimitConfig: ThrottlerOptions = {
  ttl: 60000,
  limit: 10,
};

export default ThrottlerModule.forRoot([rateLimitConfig]);
