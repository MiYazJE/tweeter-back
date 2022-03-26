import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { Hash } from 'src/utils/hash';
import { SignupDto } from './dto/auth.dto';
import { SignInDto } from './dto/signin.dto';
import { UserAlreadyExists } from './exceptions/UserAlreadyExists.exception';
import { UserOrPasswordAreIncorrect } from './exceptions/UserOrPasswordAreIncorrect.exeption';
import { UserJwtPayload } from './dto/user-jwt-payload.dto';

@Injectable({})
export class AuthService {
  constructor(
    private userService: UserService,
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signin(signInDto: SignInDto) {
    const { password, usernameOrEmail } = signInDto;

    const [userByEmail, userByUsername] = await Promise.all([
      this.userRepository.getByEmail(usernameOrEmail),
      this.userRepository.getByUsername(usernameOrEmail),
    ]);

    const userExists = userByEmail || userByUsername;

    if (!userExists) {
      throw new UserOrPasswordAreIncorrect();
    }

    const isValidPassword = await Hash.compareHash(
      password,
      userExists.password,
    );

    if (!isValidPassword) {
      throw new UserOrPasswordAreIncorrect();
    }

    const userPayload: UserJwtPayload = {
      sub: userExists._id,
      username: userExists.username,
    };
    return this.jwtService.sign(userPayload);
  }

  async signup(userDto: SignupDto): Promise<User> {
    const [emailExists, usernameExists] = await Promise.all([
      this.userRepository.getByEmail(userDto.email),
      this.userRepository.getByUsername(userDto.username),
    ]);

    if (emailExists || usernameExists) {
      throw new UserAlreadyExists();
    }

    const hashedPassword = await Hash.hashString(userDto.password);
    const user = {
      username: userDto.username,
      email: userDto.email,
      password: hashedPassword,
    };

    return this.userService.create(user);
  }
}
