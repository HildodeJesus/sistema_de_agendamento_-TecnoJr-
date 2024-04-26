import { Module } from '@nestjs/common';

import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import jwtConfig from 'src/config/jwt.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../users/user.service';
import { Users } from 'src/entities/users.entity';
import { JwtService } from '@nestjs/jwt';
import { Roles } from 'src/entities/roles.entity';
import { Establishments } from 'src/entities/establishments.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Roles, Users, Establishments]),
    jwtConfig,
  ],
  providers: [RolesService],
  controllers: [RolesController],
  exports: [RolesService],
})
export class RolesModule {}
