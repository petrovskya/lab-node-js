import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ERROR_TEXT, GREETING_TEXT } from 'config/constants';

@Injectable()
export class GreetingsService {
  getHello(name: string): string {
    if (!name) {
      throw new HttpException(ERROR_TEXT, HttpStatus.NOT_FOUND);
    }
    return GREETING_TEXT(name);
  }
}
