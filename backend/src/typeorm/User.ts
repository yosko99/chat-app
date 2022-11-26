import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @Column({
    name: 'client_id',
    nullable: false,
    default: '',
  })
  id: string;

  @Column({
    nullable: false,
    default: '',
  })
  username: string;

  @Column({
    nullable: false,
    default: '',
  })
  password: string;

  @PrimaryColumn({
    nullable: false,
    default: '',
  })
  email: string;

  @Column({
    name: 'last_online',
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastOnline: Date;

  @Column({
    nullable: false,
    default: true,
  })
  online: boolean;

  @Column({
    nullable: false,
    default: '',
  })
  img: string;
}
