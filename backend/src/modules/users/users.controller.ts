import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreateUserDto } from '../../dto/CreateUser.dto';

import { UsersService } from './users.service';

import storage from '../../config/multer.storage';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  @ApiResponse({ status: 409, description: 'Name or email is already taken' })
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileInterceptor('image', {
      storage,
      fileFilter: async (req, file, cb) => {
        if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
          cb(null, true);
        } else {
          return cb(new Error('Invalid file format'), false);
        }
      },
    }),
  )
  createUser(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'jpeg' })],
      }),
    )
    file: Express.Multer.File,
    @Body()
    userDto: CreateUserDto,
  ) {
    return this.usersService.createUser(userDto, file.filename);
  }

  @Post('/login')
  loginUser(@Body('email') email: string, @Body('password') password: string) {
    return this.usersService.loginUser(email, password);
  }

  @Get('/:email')
  getUserByEmail(@Param('email') email: string) {
    return this.usersService.getUserByEmail(email);
  }
}
