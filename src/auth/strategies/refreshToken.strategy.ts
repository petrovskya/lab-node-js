import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

import {
  AUTHORIZATION_HEADER,
  BEARER_TOKEN_START_VALUE,
  EMPTY_STRING,
  STRATEGY,
} from 'config/constants';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  STRATEGY.REFRESH,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    const refreshToken = req
      .get(AUTHORIZATION_HEADER)
      .replace(BEARER_TOKEN_START_VALUE, EMPTY_STRING)
      .trim();
    return { ...payload, refreshToken };
  }
}
