import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import {
  DATABASE_CONNECTION_ERROR,
  CONNECTION_READY_STATE,
} from 'config/constants';

@Injectable()
export class ErrorMiddleware implements NestMiddleware {
  constructor(@InjectConnection() private readonly connection: Connection) {}
  use(request: Request, response: Response, next: NextFunction) {
    const isConnected = this.connection.readyState === CONNECTION_READY_STATE;
    if (!isConnected) {
      throw new InternalServerErrorException(DATABASE_CONNECTION_ERROR);
    }
    next();
  }
}
