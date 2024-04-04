import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import UserService from '../users/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.getByEmail(email);
    if (!user) throw new UnauthorizedException('Usuário não existe');

    const validatePassword = await bcrypt.compare(pass, user.password);
    if (!validatePassword) throw new UnauthorizedException('Senha incorreta!');

    const payload = {
      id: user.id,
      email,
      name: user.name,
    };

    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }
}
