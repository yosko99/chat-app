import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dotenv = require('dotenv');

import { UsersModule } from './modules/users/users.module';

import { SocketGateway } from './socket/socket.gateway';

import entities from './typeorm';

dotenv.config();

@Module({
  imports: [
    UsersModule,
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
  providers: [SocketGateway],
})
export class AppModule {}
