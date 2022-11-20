import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn({
    name: 'conversation_id',
  })
  id: number;

  @Column({
    name: 'user_one',
    nullable: false,
  })
  @OneToOne(() => User, (user) => user.id)
  userOne: number;

  @Column({
    name: 'user_two',
    nullable: false,
  })
  @OneToOne(() => User, (user) => user.id)
  userTwo: number;
}
