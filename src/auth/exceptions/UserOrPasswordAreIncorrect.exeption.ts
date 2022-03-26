import { HttpException, HttpStatus } from '@nestjs/common';

export class UserOrPasswordAreIncorrect extends HttpException {
  constructor() {
    super('Username, email or password are incorrect', HttpStatus.UNAUTHORIZED);
  }
}
