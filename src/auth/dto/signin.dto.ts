import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({ description: 'Username or user email', required: true })
  @IsNotEmpty()
  @IsString()
  usernameOrEmail: string;

  @ApiProperty({ description: '', required: true })
  @IsNotEmpty()
  @IsString()
  password: string;
}
