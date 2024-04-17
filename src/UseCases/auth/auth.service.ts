import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import UserService from '../users/user.service';
import { ValidateEmailCode } from 'src/entities/validateEmailCode';
import { generateRandomNumbers } from 'src/helpers/generateRandomNumbers';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(ValidateEmailCode)
    private validateEmailCodeRepository: Repository<ValidateEmailCode>,
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

  async generateValidationCode(userId: string) {
    const code = generateRandomNumbers(100000, 999999).toString();
    const expires = (Date.now() + 1000 * 60 * 15) / 1000;

    this.validateEmailCodeRepository.save({
      code,
      expires,
      user: { id: userId },
    });

    return code;
  }

  async validateUser(validationCode: string, userId: string) {
    let validationCodeDBByUSer = await this.validateEmailCodeRepository.findOne(
      {
        where: { code: validationCode, user: { id: userId } },
      },
    );

    validationCodeDBByUSer = JSON.parse(JSON.stringify(validationCodeDBByUSer));

    if (
      validationCodeDBByUSer !== null &&
      validationCodeDBByUSer.expires * 1000 > Date.now()
    )
      return true;

    return false;
  }
}
