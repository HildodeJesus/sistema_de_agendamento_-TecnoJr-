import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { Users } from 'src/entities/users.entity';
import { CreateUserDto } from './dto/create_user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}
  async store(newUser: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(newUser.password, 8);

    const user = await this.userRepository.save({
      ...newUser,
      password: hashedPassword,
    });

    return user;
  }

  async getByEmail(email: string): Promise<Users> {
    const user = await this.userRepository.findOneBy({ email: email });
    return user;
  }

  async update(partialUser: Partial<Users>) {
    if (partialUser.id !== undefined) {
      await this.userRepository.save(partialUser);
      return;
    }

    const user = await this.getByEmail(partialUser.email);
    await this.userRepository.save({ ...partialUser, id: user.id });
    return;
  }
}
