import { Injectable } from '@nestjs/common';
import User from 'src/entities/User';

@Injectable()
export default class AccountService {
  store(user: User) {}

  getById(id: string) {}
}
