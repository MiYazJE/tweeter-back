import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './auth.dto';

@Injectable({})
export class AuthService {
  signin() {
    return 'signin';
  }

  signup(userDto: CreateUserDto) {
    return userDto;
  }
}
