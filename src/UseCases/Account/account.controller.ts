import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import bcrypt from 'bcrypt';

import User from 'src/entities/User';
import { CreateAccountDto } from './dto/create_account.dto';
import AccountService from './account.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('user')
export default class AccountController {
  constructor(
    private accountService: AccountService,
    @InjectQueue('email') private emailQueue: Queue,
  ) {}

  @Post()
  async create(@Body() body: CreateAccountDto) {
    try {
      const { name, email, password } = body;

      const salt = await bcrypt.genSalt(8);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newAccount = new User({ name, email, password: hashedPassword });

      this.accountService.store(newAccount);

      await this.emailQueue.add({ email, name });

      return { type: 'success', message: 'Criado com sucesso!' };
    } catch (error) {
      console.log(error);
      throw new HttpException('Some error!', 500);
    }
  }

  @Get()
  async getUser(@Param() param: CreateAccountDto) {
    try {
      const id = param['id'];

      return 'OI!!';
    } catch (error) {
      console.log(error);
      throw new HttpException('Some error!', 500);
    }
  }
}
