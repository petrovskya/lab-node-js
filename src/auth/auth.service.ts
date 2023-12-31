import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';

import { UsersService } from 'api/users';
import { CreateUserDto } from 'api/users/dto';
import {
  ACCESS_TOKEN_EXPIRATION,
  ERROR_MESSAGES,
  HASH_SALT,
  REFRESH_TOKEN_EXPIRATION,
} from 'config/constants';

import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: ACCESS_TOKEN_EXPIRATION,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: REFRESH_TOKEN_EXPIRATION,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: string) {
    const user = await this.usersService.getUserById(userId);

    if (!user) throw new ForbiddenException(ERROR_MESSAGES.ACCESS_DENIED);

    const tokens = await this.getTokens(user._id.toHexString(), user.email);

    return tokens;
  }

  async signUp(createUserDto: CreateUserDto) {
    const isUserExisting = await this.usersService.getUserByEmail(
      createUserDto.email,
    );

    if (isUserExisting) {
      throw new BadRequestException(ERROR_MESSAGES.USER_EXISTS);
    }

    const hashPassword = await hash(createUserDto.password, HASH_SALT);

    const newUser = await this.usersService.createUser({
      ...createUserDto,
      password: hashPassword,
    });

    const tokens = await this.getTokens(
      newUser._id.toHexString(),
      newUser.email,
    );

    return tokens;
  }

  async logIn(authDto: AuthDto) {
    const user = await this.usersService.getUserByEmail(authDto.email);

    if (!user) throw new BadRequestException(ERROR_MESSAGES.USER_NOT_FOUND);

    const passwordMatches = await compare(authDto.password, user.password);

    if (!passwordMatches)
      throw new BadRequestException(ERROR_MESSAGES.WRONG_PASSWORD);

    const tokens = await this.getTokens(user._id.toHexString(), user.email);

    return tokens;
  }
}
