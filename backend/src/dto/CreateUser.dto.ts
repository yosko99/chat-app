import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  username: string;

  @IsNotEmpty()
  @MinLength(10)
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
