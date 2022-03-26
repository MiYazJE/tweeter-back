import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SignupDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ description: 'Register a user for Tweeter app usage' })
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() userDto: SignupDto) {
    return this.authService.signup(userDto);
  }

  @Post('signin')
  @ApiOperation({
    description:
      'Authenticate a user by username or email and retrieves an access_token',
  })
  @HttpCode(HttpStatus.OK)
  signin(@Body() signInDto: SignInDto) {
    return this.authService.signin(signInDto);
  }
}
