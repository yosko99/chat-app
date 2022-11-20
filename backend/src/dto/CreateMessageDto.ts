import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsNumber()
  conversationForeignKey: number;

  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  @IsNumber()
  sentBy: number;
}
