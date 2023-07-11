import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

import {
  ERROR_VALIDATION_MESSAGES,
  NOTE_VALIDATION_SCHEMA,
} from 'config/constants';

export class UpdateNoteDto {
  @IsString()
  @IsNotEmpty()
  _id: string;

  @IsString({ message: ERROR_VALIDATION_MESSAGES.NOT_STRING })
  @MinLength(NOTE_VALIDATION_SCHEMA.TITLE.MIN_LENGTH, {
    message: ERROR_VALIDATION_MESSAGES.NOTE_TITLE,
  })
  title: string;

  @IsString({ message: ERROR_VALIDATION_MESSAGES.NOT_STRING })
  @Length(
    NOTE_VALIDATION_SCHEMA.CONTENT.MIN_LENGTH,
    NOTE_VALIDATION_SCHEMA.CONTENT.MAX_LENGTH,
    { message: ERROR_VALIDATION_MESSAGES.NOTE_CONTENT },
  )
  content: string;
}
