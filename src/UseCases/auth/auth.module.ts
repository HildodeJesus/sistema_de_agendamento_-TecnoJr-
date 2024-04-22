import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import AuthController from './auth.controller';
import jwtConfig from 'src/config/jwt.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UserService} from '../users/user.service';
import { Users } from 'src/entities/users.entity';
import { JwtService } from '@nestjs/jwt';
import { ValidateEmailCode } from 'src/entities/validateEmailCode';

@Module({
  imports: [TypeOrmModule.forFeature([ValidateEmailCode, Users]), jwtConfig],
  providers: [AuthService, UserService, JwtService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
