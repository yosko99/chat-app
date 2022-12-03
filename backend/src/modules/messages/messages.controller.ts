import { Controller, Get, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get('/:conversationID')
  getMessages(@Param('conversationID') conversationID: number) {
    return this.messagesService.getMessages(conversationID);
  }
}
