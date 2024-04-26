import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { ValidateUserDto } from './dto/validateUser.dto';
import { UserService } from '../users/user.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export default class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign_in')
  async signIn(@Body() signInDto: SignInDto) {
    const { email, password } = signInDto;

    return await this.authService.signIn(email, password);
  }

  @Post('validate_email')
  async validateUser(@Body() body: ValidateUserDto) {
    const { code, email } = body;

    const validate = await this.authService.validateUserForEmail(code, email);
    console.log(validate);
    if (!validate) throw new UnauthorizedException();

    await this.userService.update({ email: email, isActivated: true });

    return { type: 'success', message: 'Conta ativada!' };
  }
}
