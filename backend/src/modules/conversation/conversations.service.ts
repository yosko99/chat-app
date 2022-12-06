import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';

import { Conversation } from '../../typeorm/Conversation';

import { ConverastionType } from '../../types/conversations.type';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}

  async getConversationByID(id: number) {
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

  async getConversationsByUser(token: string) {
    if (token === undefined) {
      return new NotFoundException('Token not provided.');
    }

    const extractedToken = token.split(' ')[1];

    try {
      const { email } = jwt.verify(
        extractedToken,
        process.env.JSONWEBTOKEN_KEY,
      );

      const conversations = await this.conversationRepository.find({
        where: [{ userOne: email }, { userTwo: email }],
      });

      if (conversations === null) {
        return new NotFoundException(
          'Converastion with provided email does not exist.',
        );
      }

      conversations.map((conversation: ConverastionType) => {
        if (conversation.userOne === email) {
          conversation.recieverEmail = conversation.userTwo;
          conversation.senderEmail = email;
        } else {
          conversation.senderEmail = conversation.userTwo;
          conversation.recieverEmail = email;
        }
      });

      return conversations;
    } catch (error) {
      return new NotFoundException('Provided invalid token.');
    }
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
