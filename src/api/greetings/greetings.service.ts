import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ERROR_MESSAGES, GREETING_TEXT } from 'config/constants';

@Injectable()
export class GreetingsService {
  getHello(name: string): string {
    if (!name) {
      throw new HttpException(ERROR_MESSAGES, HttpStatus.NOT_FOUND);
    }

    return GREETING_TEXT(name);
  }
}
