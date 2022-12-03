import { Controller, Get, Param, Headers } from '@nestjs/common';

import { ConversationsService } from './conversations.service';

@Controller('/conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Get('/:id')
  getConversationByID(@Param('id') id: number) {
    return this.conversationsService.getConversationByID(id);
  }

  @Get()
  getConversations(@Headers() headers: { authorization: string }) {
    return this.conversationsService.getConversationsByUser(
      headers.authorization,
    );
  }
}
