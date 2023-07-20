import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import {
  DEFAULT_NOTES_LIMIT_VALUE,
  DEFAULT_PAGE_VALUE,
  NOT_FOUND_MESSAGE,
  SUCCESS_DELETE_TEXT,
  titleRegExp,
} from 'config/constants';
import { getEndOfTheDay, getResponseError, getSkipValue } from 'utils';

import { CreateNoteDto, NotesDto, UpdateNoteDto } from './dto';
import { Note, NoteDocument } from './entities';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async getAllNotes({
    page = DEFAULT_PAGE_VALUE,
    limit = DEFAULT_NOTES_LIMIT_VALUE,
    title,
    createdAt,
  }: NotesDto): Promise<NoteDocument[]> {
    const skippedNotes = getSkipValue(page, limit);

    const filter: FilterQuery<Note> = {
      isDeleted: false,
      ...(title && { title: titleRegExp(title) }),
      ...(createdAt && {
        createdAt: {
          $gte: createdAt,
          $lte: getEndOfTheDay(createdAt),
        },
      }),
    };

    try {
      const notesResponse = await this.noteModel
        .find(filter)
        .limit(limit)
        .skip(skippedNotes);

      if (!notesResponse.length) {
        throw new NotFoundException(NOT_FOUND_MESSAGE.NOTES);
      }

      return notesResponse;
    } catch (error) {
      getResponseError(error, error.message);
    }
  }

  async getNoteById(id: string): Promise<NoteDocument> {
    try {
      const noteResponse = await this.noteModel.findById({ _id: id });
      if (!noteResponse) {
        throw new NotFoundException(NOT_FOUND_MESSAGE.NOTE);
      }

      return noteResponse;
    } catch (error) {
      getResponseError(error, error.message);
    }
  }

  async createNote(createNoteDto: CreateNoteDto): Promise<NoteDocument> {
    const { title, content } = createNoteDto;
    try {
      const createdNote = await this.noteModel.create({ title, content });

      return createdNote;
    } catch (error) {
      getResponseError(error, error.message);
    }
  }

  async updateNote(
    updateNoteDto: UpdateNoteDto,
    id: string,
  ): Promise<NoteDocument> {
    try {
      const updatedNote = await this.noteModel.findByIdAndUpdate(
        { _id: id },
        { ...updateNoteDto, updatedAt: Date.now() },
        { new: true },
      );

      return updatedNote;
    } catch (error) {
      getResponseError(error, error.message);
    }
  }

  async deleteNote(id: string) {
    try {
      await this.noteModel.findByIdAndUpdate({ _id: id }, { isDeleted: true });

      return SUCCESS_DELETE_TEXT(id);
    } catch (error) {
      getResponseError(error);
    }
  }
}
