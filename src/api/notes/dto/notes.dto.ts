import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { transformToInteger } from 'utils';

export class NotesDto {
  @IsOptional()
  @IsNumber()
  @Transform(transformToInteger)
  page: number;

  @IsOptional()
  @IsNumber()
  @Transform(transformToInteger)
  limit: number;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  createdAt: Date;
}
