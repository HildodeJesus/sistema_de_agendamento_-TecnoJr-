import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { signInDto } from './dto/signin.dto';
import { validateUserDto } from './dto/validateUser.dto';
import UserService from '../users/user.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export default class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign_in')
  async signIn(@Body() body: signInDto) {
    const { email, password } = body;

    return await this.authService.signIn(email, password);
  }

  @Post('validate')
  async validateUser(@Body() body: validateUserDto) {
    const { code, userId } = body;

    const validate = await this.authService.validateUser(code, userId);
    if (!validate) throw new UnauthorizedException();

    this.userService.update({ id: userId, isActivated: true });

    return { type: 'success', message: 'Conta ativada!' };
  }
}
