import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { STRATEGY } from 'config/constants';

@Injectable()
export class RefreshTokenGuard extends AuthGuard(STRATEGY.REFRESH) {}
