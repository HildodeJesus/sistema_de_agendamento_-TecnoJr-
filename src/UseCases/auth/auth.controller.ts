import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { signInDto } from './dto/signin.dto';

@Controller('auth')
export default class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  async signIn(@Body() body: signInDto) {
    const { email, password } = body;

    return await this.authService.signIn(email, password);
  }
}
