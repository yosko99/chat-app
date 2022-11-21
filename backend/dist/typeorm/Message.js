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
exports.Message = void 0;
const typeorm_1 = require("typeorm");
const Conversation_1 = require("./Conversation");
const User_1 = require("./User");
let Message = class Message {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'message_id',
    }),
    __metadata("design:type", Number)
], Message.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'conversation_fk',
    }),
    (0, typeorm_1.OneToOne)(() => Conversation_1.Conversation, (conversation) => conversation.id),
    __metadata("design:type", Number)
], Message.prototype, "conversationForeignKey", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        default: '',
    }),
    __metadata("design:type", String)
], Message.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'created_at',
        nullable: false,
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Message.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        default: '',
    }),
    __metadata("design:type", String)
], Message.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'user_id_fk',
        nullable: false,
    }),
    (0, typeorm_1.OneToOne)(() => User_1.User, (user) => user.id),
    __metadata("design:type", Number)
], Message.prototype, "sentBy", void 0);
Message = __decorate([
    (0, typeorm_1.Entity)()
], Message);
exports.Message = Message;
//# sourceMappingURL=Message.js.map