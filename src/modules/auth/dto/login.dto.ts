import { IsEmail, IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}