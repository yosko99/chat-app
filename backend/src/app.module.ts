import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dotenv = require('dotenv');
import { AppGateway } from './modules/socket/socket.gateway';

import { SocketModule } from './modules/socket/socket.gateway.module';
import { UsersModule } from './modules/users/users.module';

import entities from './typeorm';
import { User } from './typeorm/User';

dotenv.config();

@Module({
  imports: [
    UsersModule,
    SocketModule,
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOSTNAME,
      port: process.env.DB_PORT as unknown as number,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: entities,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
