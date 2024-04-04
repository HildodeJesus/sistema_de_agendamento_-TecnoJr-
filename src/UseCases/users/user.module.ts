import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserController from './user.controller';
import UserService from './user.service';
import { User } from 'src/entities/user.entity';
import nodemailerConfig from 'src/config/nodemailer.config';
import { SendEmailProcessor } from 'src/jobs/sendEmail.processor';
import queueConfig from 'src/config/queue.config';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    queueConfig,
    BullModule.registerQueue({ name: 'send-email' }),
    nodemailerConfig,
  ],
  controllers: [UserController],
  providers: [UserService, SendEmailProcessor],
  exports: [UserService],
})
export class UserModule {}
