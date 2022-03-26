import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({ description: '', required: true })
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ description: '', required: true })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ description: '', required: true })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
