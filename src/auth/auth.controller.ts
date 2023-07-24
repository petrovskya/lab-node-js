import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { CreateUserDto } from 'api/users/dto';
import {
  COOKIE_MAX_AGE_IN_DAYS,
  COOKIE_NAME,
  REQUEST_SUBJECT_KEY,
  ROUTES,
  SUB_ROUTES,
} from 'config/constants';
import { AccessTokenGuard, RefreshTokenGuard } from 'guards';
import { getCookieMaxAge } from 'utils';

import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller(ROUTES.AUTH)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(SUB_ROUTES.SIGN_UP)
  async signUp(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const tokens = await this.authService.signUp(createUserDto);

    res.cookie(COOKIE_NAME, tokens.refreshToken, {
      maxAge: getCookieMaxAge(COOKIE_MAX_AGE_IN_DAYS),
      httpOnly: true,
    });

    return res.send(tokens);
  }

  @Post(SUB_ROUTES.LOG_IN)
  async logIn(@Body() authDto: AuthDto, @Res() res: Response) {
    const tokens = await this.authService.logIn(authDto);

    res.cookie(COOKIE_NAME, tokens.refreshToken, {
      maxAge: getCookieMaxAge(COOKIE_MAX_AGE_IN_DAYS),
      httpOnly: true,
    });

    return res.send(tokens);
  }

  @UseGuards(AccessTokenGuard)
  @Get(SUB_ROUTES.LOG_OUT)
  logOut(@Res() res: Response) {
    res.clearCookie(COOKIE_NAME);
    return res.send();
  }

  @UseGuards(RefreshTokenGuard)
  @Get(SUB_ROUTES.REFRESH)
  async refreshTokens(@Req() req: Request, @Res() res: Response) {
    const userId = req.user[REQUEST_SUBJECT_KEY];

    const tokens = await this.authService.refreshTokens(userId);

    res.cookie(COOKIE_NAME, tokens.refreshToken, {
      maxAge: getCookieMaxAge(COOKIE_MAX_AGE_IN_DAYS),
      httpOnly: true,
    });

    return res.send(tokens);
  }
}
