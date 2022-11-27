import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Conversation } from '../../typeorm/Conversation';

import { Repository } from 'typeorm';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}

  async getConversation(id: number) {
    const conversation = await this.conversationRepository.findOne({
      where: { id },
    });

    if (conversation === null) {
      return new NotFoundException(
        'Converastion with provided id does not exist.',
      );
    }

    return conversation;
  }

  public async createConversation(userOneEmail: string, userTwoEmail: string) {
    const newConversation = await this.conversationRepository.create({
      userOne: userOneEmail,
      userTwo: userTwoEmail,
    });

    await this.conversationRepository.save(newConversation);

    return newConversation;
  }

  public async getConversationQuery(
    userOneEmail: string,
    userTwoEmail: string,
  ) {
    const conversation = await this.conversationRepository.findOne({
      where: { userOne: userOneEmail, userTwo: userTwoEmail },
    });

    return conversation;
  }
}
