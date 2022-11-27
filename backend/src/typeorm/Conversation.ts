import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn({
    name: 'conversation_id',
  })
  id: number;

  @Column({
    name: 'user_one_email',
    nullable: false,
  })
  @OneToOne(() => User, (user) => user.email)
  userOne: string;

  @Column({
    name: 'user_two_email',
    nullable: false,
  })
  @OneToOne(() => User, (user) => user.email)
  userTwo: string;
}
