import { Controller, Get, Param } from '@nestjs/common';

import { ConversationsService } from './conversations.service';

@Controller('/conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Get('/:id')
  getConversation(@Param('id') id: number) {
    return this.conversationsService.getConversation(id);
  }
}
