import { Transform, TransformFnParams } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class NotesDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }: TransformFnParams) => parseInt(value, 10))
  page: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }: TransformFnParams) => parseInt(value, 10))
  limit: number;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  createdAt: Date;
}
