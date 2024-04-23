import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserService } from '../users/user.service';
import { ValidateUser } from 'src/entities/validateUser';
import { generateRandomNumbers } from 'src/helpers/generateRandomNumbers';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(ValidateUser)
    private validateUserRepository: Repository<ValidateUser>,
  ) {}
  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.getByEmail(email);
    if (!user) throw new UnauthorizedException('Usuário não existe');

    const validatePassword = await bcrypt.compare(pass, user.password);
    if (!validatePassword) throw new UnauthorizedException('Senha incorreta!');

    const payload = {
      id: user.id,
      email,
      isActivated: user.isActivated,
      name: user.name,
      role: user.role,
    };

    const access_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });

    return { access_token, user: payload };
  }

  async startedValidateUserForEmail(email: string) {
    const code = generateRandomNumbers(100000, 999999).toString();
    const expires = (Date.now() + 1000 * 60 * 15) / 1000;

    this.validateUserRepository.save({
      code,
      expires,
      user_email: email,
    });

    return code;
  }

  async validateUserForEmail(validationCode: string, email: string) {
    let validationCodeDBByUser = await this.validateUserRepository.findOne({
      where: { code: validationCode, user_email: email },
    });

    validationCodeDBByUser = JSON.parse(JSON.stringify(validationCodeDBByUser));

    if (
      validationCodeDBByUser !== null &&
      validationCodeDBByUser.expires * 1000 > Date.now()
    )
      return true;

    return false;
  }
}
