import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
)
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ description: 'Register a user for Tweeter app usage' })
  @HttpCode(HttpStatus.ACCEPTED)
  signup(@Body() userDto: CreateUserDto) {
    return this.authService.signup(userDto);
  }

  @Post('signin')
  signin() {
    return this.authService.signin();
  }
}
