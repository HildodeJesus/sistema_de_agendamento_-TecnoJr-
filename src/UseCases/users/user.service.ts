import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { Users } from 'src/entities/users.entity';
import { CreateUserDto } from './dto/create_user.dto';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}
  async store(newUser: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(newUser.password, 8);

    const user = await this.userRepository.save({
      ...newUser,
      password: hashedPassword,
    });

    console.log(user);

    return user;
  }

  async getByEmail(email: string): Promise<Users> {
    const user = await this.userRepository.findOneBy({ email: email });
    return user;
  }

  async update(partialUser: Partial<Users>) {
    this.userRepository.save(partialUser);
  }
}
