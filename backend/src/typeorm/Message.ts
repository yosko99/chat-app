import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Conversation } from './Conversation';
import { User } from './User';

@Entity()
export class Message {
  @PrimaryGeneratedColumn({
    name: 'message_id',
  })
  id: number;

  @Column({
    name: 'conversation_fk',
  })
  @OneToOne(() => Conversation, (conversation) => conversation.id)
  conversationForeignKey: number;

  @Column({
    nullable: false,
    default: '',
  })
  message: string;

  @Column({
    name: 'created_at',
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    nullable: false,
    default: '',
  })
  status: string;

  @Column({
    name: 'user_id_fk',
    nullable: false,
  })
  @OneToOne(() => User, (user) => user.id)
  sentBy: number;
}
