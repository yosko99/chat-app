import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  conversationForeignKey: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  message: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  status: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  sentBy: number;
}
