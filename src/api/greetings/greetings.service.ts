import { Injectable } from '@nestjs/common';

import { GREETING_TEXT } from 'config/constants';

@Injectable()
export class GreetingsService {
  getHello(name: string): string {
    return GREETING_TEXT(name);
  }
}
