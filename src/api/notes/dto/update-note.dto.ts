import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

import { NOTE_VALIDATION_SCHEMA } from 'config/constants';

export class UpdateNoteDto {
  @IsString()
  @IsNotEmpty()
  readonly _id: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(NOTE_VALIDATION_SCHEMA.TITLE.MIN_LENGTH)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(NOTE_VALIDATION_SCHEMA.CONTENT.MIN_LENGTH)
  @MaxLength(NOTE_VALIDATION_SCHEMA.CONTENT.MAX_LENGTH)
  content: string;

  @IsString()
  @IsNotEmpty()
  readonly createdAt: string;

  @IsString()
  updatedAt: string;
}
