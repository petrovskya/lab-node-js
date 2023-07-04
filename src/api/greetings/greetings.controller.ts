import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';

import { ROUTES, SUB_ROUTES, ERROR_TEXT, PARAMS } from 'config/constants';

import { GreetingsService } from './greetings.service';

@Controller(ROUTES.API)
export class GreetingsController {
  constructor(private readonly greetingsService: GreetingsService) {}

  @Get(SUB_ROUTES.GREETINGS)
  getHello(@Query(PARAMS.NAME) name: string): string {
    if (!name) {
      throw new HttpException(ERROR_TEXT, HttpStatus.NOT_FOUND);
    }
    return this.greetingsService.getHello(name);
  }
}
