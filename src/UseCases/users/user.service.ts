import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { Users } from 'src/entities/users.entity';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}
  async store(
    newUser: Omit<Users, 'id' | 'created_at' | 'updated_at' | 'schedules'>,
  ): Promise<void> {
    const hashedPassword = await bcrypt.hash(newUser.password, 8);

    await this.userRepository.save({ ...newUser, password: hashedPassword });

    return;
  }

  async getByEmail(email: string): Promise<Users> {
    const user = await this.userRepository.findOneBy({ email: email });
    return user;
  }
}
