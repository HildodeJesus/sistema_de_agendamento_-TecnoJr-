import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import { CreateUserDto } from './dto/create_user.dto';
import UserService from './user.service';
import { AuthService } from '../auth/auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export default class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    @InjectQueue('validation-email') private validationEmailQueue: Queue,
  ) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    const { name, email, password } = body;

    const newUser = {
      name,
      email,
      password,
      isActivated: false,
    };

    const user = await this.userService.store(newUser);

    const validationCode = await this.authService.generateValidationCode(
      user.id,
    );

    await this.validationEmailQueue.add(
      { email, name, validationCode },
      { delay: 5000 },
    );

    return { type: 'success', message: 'Criado com sucesso!' };
  }

  @Get()
  async getUser(@Body() body: CreateUserDto) {
    // const { name, email, password } = body;

    return { type: 'success', message: 'Criado com sucesso!' };
  }
}
