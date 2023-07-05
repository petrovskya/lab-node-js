import { Controller, Get, Query } from '@nestjs/common';

import { ROUTES, SUB_ROUTES, PARAMS } from 'config/constants';

import { GreetingsService } from './greetings.service';

@Controller(ROUTES.API)
export class GreetingsController {
  constructor(private readonly greetingsService: GreetingsService) {}

  @Get(SUB_ROUTES.GREETINGS)
  getHello(@Query(PARAMS.NAME) name: string): string {
    return this.greetingsService.getHello(name);
  }
}
