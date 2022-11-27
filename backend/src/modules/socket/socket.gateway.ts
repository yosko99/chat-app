import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

import { ConversationsService } from '../conversation/conversations.service';
import { SocketService } from './socket.service';

import { Conversation } from '../../typeorm/Conversation';
import { User } from '../../typeorm/User';

@WebSocketGateway({ cors: true })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private socketService: SocketService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Conversation)
    private readonly converastionsService: ConversationsService,
  ) {}
  @WebSocketServer() public server: Server;
  private logger: Logger = new Logger('AppGateway');

  async afterInit(server: Server) {
    this.logger.log('Gateway initialized');
    this.socketService.socket = server;
  }

  async handleDisconnect(client: Socket) {
    const users = await this.getUsers();

    for (let i = 0; i < users.length; i++) {
      if (users[i].id === client.id) {
        users[i].id = '';
        users[i].online = false;
        users[i].lastOnline = new Date();
        break;
      }
    }

    this.userRepository.save(users);

    this.server.emit('online', { online: users });
  }

  @SubscribeMessage('connected')
  async handleConnection(client: Socket, token: string) {
    if (token !== undefined && token !== null) {
      const decoded = jwt.verify(token, process.env.JSONWEBTOKEN_KEY);

      const users = await this.getUsers();

      for (let i = 0; i < users.length; i++) {
        if (users[i].email === decoded.email) {
          users[i].online = true;
          users[i].id = client.id;
          break;
        }
      }

      this.userRepository.save(users);

      this.server.emit('online', { online: users });
    }
  }

  @SubscribeMessage('conversation')
  async test(client: Socket, data: { token: string; reciever: User }) {
    const decoded = jwt.verify(data.token, process.env.JSONWEBTOKEN_KEY);

    const conversationOne =
      await this.converastionsService.getConversationQuery(
        decoded.email,
        data.reciever.email,
      );

    const conversationTwo =
      await this.converastionsService.getConversationQuery(
        data.reciever.email,
        decoded.email,
      );

    let conversation: Conversation;

    if (conversationOne === null && conversationTwo === null) {
      conversation = await this.converastionsService.createConversation(
        decoded.email,
        data.reciever.email,
      );
    } else {
      conversation =
        conversationOne !== null ? conversationOne : conversationTwo;
    }

    this.server.emit('conversation-open', conversation.id);
  }

  private async getUsers() {
    const users = await this.userRepository.find({
      select: ['email', 'img', 'lastOnline', 'username', 'id', 'online'],
    });

    return users;
  }
}
