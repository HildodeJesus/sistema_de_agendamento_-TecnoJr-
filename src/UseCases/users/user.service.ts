import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { User } from 'src/entities/user.entity';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async store(
    newUser: Omit<User, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<void> {
    const hashedPassword = await bcrypt.hash(newUser.password, 8);

    await this.userRepository.save({ ...newUser, password: hashedPassword });

    return;
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: email });
    return user;
  }
}
