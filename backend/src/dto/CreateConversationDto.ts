import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateConversationDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  userOne: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  userTwo: number;
}
