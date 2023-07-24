import { IsString, Length } from 'class-validator';

import {
  ERROR_VALIDATION_MESSAGES,
  USER_VALIDATION_SCHEMA,
} from 'config/constants';

export class AuthDto {
  @IsString({ message: ERROR_VALIDATION_MESSAGES.NOT_STRING })
  @Length(
    USER_VALIDATION_SCHEMA.EMAIL.MIN_LENGTH,
    USER_VALIDATION_SCHEMA.EMAIL.MAX_LENGTH,
    {
      message: ERROR_VALIDATION_MESSAGES.USER_EMAIL,
    },
  )
  email: string;

  @IsString({ message: ERROR_VALIDATION_MESSAGES.NOT_STRING })
  @Length(
    USER_VALIDATION_SCHEMA.PASSWORD.MIN_LENGTH,
    USER_VALIDATION_SCHEMA.PASSWORD.MAX_LENGTH,
    {
      message: ERROR_VALIDATION_MESSAGES.USER_PASSWORD,
    },
  )
  password: string;
}
