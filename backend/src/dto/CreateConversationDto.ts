import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateConversationDto {
  @IsNotEmpty()
  @IsNumber()
  userOne: number;

  @IsNotEmpty()
  @IsNumber()
  userTwo: number;
}
