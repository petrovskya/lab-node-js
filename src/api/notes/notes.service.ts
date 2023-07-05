import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { EMPTY_ARRAY, ERROR_TEXT, SUCCESS_DELETE_TEXT } from 'config/constants';

import { CreateNoteDto, UpdateNoteDto } from './dto';

@Injectable()
export class NotesService {
  private readonly notes: CreateNoteDto[] = [];
  getAllNotes(): [] {
    return EMPTY_ARRAY;
  }

  createNote(createNoteDto: CreateNoteDto): CreateNoteDto {
    this.notes.push(createNoteDto);
    return createNoteDto;
  }

  updateNote(updateNoteDto: UpdateNoteDto, id: string): UpdateNoteDto {
    if (!id) {
      throw new HttpException(ERROR_TEXT.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }
    return updateNoteDto;
  }

  deleteNote(id: string) {
    return SUCCESS_DELETE_TEXT(id);
  }
}
