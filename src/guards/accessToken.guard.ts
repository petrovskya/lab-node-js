import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { STRATEGY } from 'config/constants';

@Injectable()
export class AccessTokenGuard extends AuthGuard(STRATEGY.ACCESS) {}
