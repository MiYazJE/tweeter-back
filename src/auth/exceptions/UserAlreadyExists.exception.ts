import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExists extends HttpException {
  constructor() {
    super('Username or email are already registered.', HttpStatus.BAD_REQUEST);
  }
}
