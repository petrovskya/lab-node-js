import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ERROR_TEXT, SUCCESS_DELETE_TEXT } from 'config/constants';

import { CreateNoteDto, UpdateNoteDto } from './dto';
import { Note } from './entities';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  getAllNotes(): Promise<Note[]> {
    return this.noteModel.find().exec();
  }

  async createNote(createNoteDto: CreateNoteDto): Promise<Note> {
    const createdNote = new this.noteModel(createNoteDto);
    return createdNote.save();
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
