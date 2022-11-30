import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/typeorm/Message';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
  ) {}

  async getMessages(conversationID: number) {
    const messages = await this.messagesRepository.findBy({
      conversationForeignKey: conversationID,
    });

    return messages;
  }
}
