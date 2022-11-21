import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { User } from 'src/typeorm/User';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(
    { email, password, username }: CreateUserDto,
    filename: string,
  ) {
    const newUser = await this.userRepository.create({
      email,
      password,
      username,
      img: filename,
    });

    await this.userRepository.save(newUser);

    return {
      user: newUser,
    };
  }
}
