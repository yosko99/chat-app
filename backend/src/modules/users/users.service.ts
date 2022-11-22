import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import deleteImage from '../../functions/deleteImage';

import { CreateUserDto } from '../../dto/CreateUser.dto';

import { User } from '../../typeorm/User';

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
    const doesExist =
      (await this.userRepository.findOneBy([{ email }, { username }])) !== null;

    if (doesExist) {
      deleteImage(filename);
      return new HttpException('Name or email is already taken', 409);
    }

    const newUser = await this.userRepository.create({
      email,
      password,
      username,
      img: filename,
    });

    await this.userRepository.save(newUser);

    return {
      message: 'User created successfully',
      user: newUser,
    };
  }
}
