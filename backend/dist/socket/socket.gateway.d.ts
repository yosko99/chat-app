import { OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class SocketGateway implements OnGatewayInit, OnGatewayDisconnect {
    users: any[];
    private logger;
    wss: Server;
    afterInit(): void;
    handleDisconnect(client: Socket & {
        num: number;
    }): void;
    handleConnected(client: Socket & {
        name: string;
    }, name: string): void;
}
