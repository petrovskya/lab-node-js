import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { ERROR_VALIDATION_MESSAGES } from 'config/constants';

export type NoteDocument = HydratedDocument<Note>;

@Schema({ versionKey: false })
export class Note {
  @Prop({
    required: [true, ERROR_VALIDATION_MESSAGES.NOTE_TITLE],
  })
  title: string;

  @Prop({
    required: [true, ERROR_VALIDATION_MESSAGES.NOTE_CONTENT],
  })
  content: string;

  @Prop({ required: true, type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
