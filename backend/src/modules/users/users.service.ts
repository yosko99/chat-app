import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

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
      status: 200,
      token: this.generateToken(newUser.email, newUser.password),
    };
  }

  async loginUser(email, password) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user === null || user.email !== email) {
      return new NotFoundException('User with provided email does not exist.');
    }

    if (user.password !== password) {
      return new HttpException('Password does not match registered user.', 403);
    }

    return {
      status: 200,
      token: this.generateToken(email, password),
      message: 'Logged in successfully',
    };
  }

  private generateToken(email: string, password: string) {
    const token = jwt.sign({ email, password }, process.env.JSONWEBTOKEN_KEY);

    return token;
  }
}
