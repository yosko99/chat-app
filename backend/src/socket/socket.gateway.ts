import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayInit, OnGatewayDisconnect {
  users = [];
  private logger: Logger = new Logger('AppGateaway');
  @WebSocketServer() wss: Server;

  afterInit() {
    this.logger.log('Initialized');
  }

  handleDisconnect(client: Socket & { num: number }): void {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === client.id) {
        this.users.splice(i, 1);
        break;
      }
    }

    this.wss.emit('online', { online: this.users });
  }

  @SubscribeMessage('connected')
  handleConnected(client: Socket & { name: string }, name: string): void {
    client.name = name;

    this.users.push({
      id: client.id,
      name: client.name,
    });

    this.wss.emit('online', { online: this.users });
  }
}
