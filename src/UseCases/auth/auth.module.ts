import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import AuthController from './auth.controller';
import { UserModule } from '../users/user.module';
import jwtConfig from 'src/config/jwt.config';

@Module({
  imports: [UserModule, jwtConfig],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
