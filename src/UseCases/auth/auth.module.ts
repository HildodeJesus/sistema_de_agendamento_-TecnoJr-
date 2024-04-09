import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import AuthController from './auth.controller';
import { UserModule } from '../users/user.module';
import jwtConfig from 'src/config/jwt.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountActivationCode } from 'src/entities/accountActivationCode';
import UserService from '../users/user.service';
import { Users } from 'src/entities/users.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountActivationCode, Users]),
    jwtConfig,
  ],
  providers: [AuthService, UserService, JwtService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
