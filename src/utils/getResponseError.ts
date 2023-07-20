import { BadRequestException, HttpException } from '@nestjs/common';

import { ERROR_MESSAGES } from 'config/constants';

export const getResponseError = (error: unknown, errorMessage?: string) => {
  throw error instanceof HttpException
    ? error
    : new BadRequestException(
        errorMessage ? errorMessage : ERROR_MESSAGES.BAD_REQUEST,
      );
};
