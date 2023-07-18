import { IsString, Length, MinLength } from 'class-validator';

import {
  USER_VALIDATION_SCHEMA,
  ERROR_VALIDATION_MESSAGES,
} from 'config/constants';

export class UpdateUserDto {
  @IsString({ message: ERROR_VALIDATION_MESSAGES.NOT_STRING })
  @MinLength(USER_VALIDATION_SCHEMA.FIRST_NAME.MIN_LENGTH, {
    message: ERROR_VALIDATION_MESSAGES.USER_FIRST_NAME,
  })
  firstName: string;

  @IsString({ message: ERROR_VALIDATION_MESSAGES.NOT_STRING })
  @MinLength(USER_VALIDATION_SCHEMA.LAST_NAME.MIN_LENGTH, {
    message: ERROR_VALIDATION_MESSAGES.USER_LAST_NAME,
  })
  lastName: string;

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

  @IsString({ message: ERROR_VALIDATION_MESSAGES.NOT_STRING })
  refreshToken: string;
}
