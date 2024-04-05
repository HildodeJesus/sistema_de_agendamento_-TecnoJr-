import { Body, Controller, Post } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import { CreateUserDto } from './dto/create_user.dto';
import UserService from './user.service';

@Controller('users')
export default class UserController {
  constructor(
    private userService: UserService,
    @InjectQueue('send-email') private emailQueue: Queue,
  ) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    const { name, email, password } = body;

    const newUser = {
      name,
      email,
      password,
    };

    await this.userService.store(newUser);

    await this.emailQueue.add({ email, name }, { delay: 6000 });

    return { type: 'success', message: 'Criado com sucesso!' };
  }
}
