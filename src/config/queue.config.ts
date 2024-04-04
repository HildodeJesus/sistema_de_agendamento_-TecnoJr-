import { BullModule } from '@nestjs/bull';

export default BullModule.forRoot({
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});
