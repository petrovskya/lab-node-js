import { BadRequestException, HttpException } from '@nestjs/common';

import { ERROR_TEXT } from 'config/constants';

export const getResponseError = (error: unknown, errorMessage?: string) => {
  throw error instanceof HttpException
    ? error
    : new BadRequestException(
        errorMessage ? errorMessage : ERROR_TEXT.BAD_REQUEST,
      );
};
