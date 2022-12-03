import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';

import { UsersController } from './users.controller';

import { User } from '../../typeorm/User';

import { CheckIfUploadsFolderExists } from '../../middleware/checkIfUploadsFolderExists.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIfUploadsFolderExists).forRoutes({
      path: '/users',
      method: RequestMethod.POST,
    });
  }
}
