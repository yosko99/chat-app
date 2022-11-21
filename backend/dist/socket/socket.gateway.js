"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let SocketGateway = class SocketGateway {
    constructor() {
        this.users = [];
        this.logger = new common_1.Logger('AppGateaway');
    }
    afterInit() {
        this.logger.log('Initialized');
    }
    handleDisconnect(client) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === client.id) {
                this.users.splice(i, 1);
                break;
            }
        }
        this.wss.emit('online', { online: this.users });
    }
    handleConnected(client, name) {
        client.name = name;
        this.users.push({
            id: client.id,
            name: client.name,
        });
        this.wss.emit('online', { online: this.users });
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], SocketGateway.prototype, "wss", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('connected'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], SocketGateway.prototype, "handleConnected", null);
SocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true })
], SocketGateway);
exports.SocketGateway = SocketGateway;
//# sourceMappingURL=socket.gateway.js.map