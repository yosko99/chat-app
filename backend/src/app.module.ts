import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { UsersModule } from './modules/users/users.module';

import { SocketGateway } from './socket/socket.gateway';

const { DB_HOSTNAME, DB_PASSWORD, DB_PORT, DB_USERNAME, DB_DATABASE } =
  process.env;

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DB_HOSTNAME,
      port: DB_PORT as unknown as number,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, SocketGateway],
})
export class AppModule {}
