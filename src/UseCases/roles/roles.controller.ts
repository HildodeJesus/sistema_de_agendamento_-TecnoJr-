import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { RolesService } from './roles.service';
import { SignInDto } from './dto/signin.dto';
import { ValidateUserDto } from './dto/validateUser.dto';
import { UserService } from '../users/user.service';
import { ApiTags, SwaggerModule } from '@nestjs/swagger';
import { paths } from 'src/config/swagger.config';

@Controller('roles')
@ApiTags('Roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get()
  async getEndpoints() {
    console.log(paths);

    return;
  }
}
