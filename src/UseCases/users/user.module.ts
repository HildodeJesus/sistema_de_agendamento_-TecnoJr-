import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserController from './user.controller';
import UserService from './user.service';
import { Users } from 'src/entities/users.entity';
import nodemailerConfig from 'src/config/nodemailer.config';
import { ValidationEmailProcessor } from 'src/jobs/validationEmail.processor';
import queueConfig from 'src/config/queue.config';
import { BullModule } from '@nestjs/bull';
import { AuthService } from '../auth/auth.service';
import { AccountActivationCode } from 'src/entities/accountActivationCode';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, AccountActivationCode]),
    queueConfig,
    BullModule.registerQueue({ name: 'validation-email' }),
    nodemailerConfig,
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, ValidationEmailProcessor],
  exports: [UserService],
})
export class UserModule {}
