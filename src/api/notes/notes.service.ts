import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SUCCESS_DELETE_TEXT } from 'config/constants';

import { CreateNoteDto, UpdateNoteDto } from './dto';
import { Note } from './entities';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  async getAllNotes(): Promise<Note[]> {
    return await this.noteModel.find().exec();
  }

  async createNote(createNoteDto: CreateNoteDto): Promise<Note> {
    const { title, content } = createNoteDto;
    return await this.noteModel.create({ title, content });
  }

  async updateNote(updateNoteDto: UpdateNoteDto, id: string): Promise<Note> {
    const updatedNote = await this.noteModel.findByIdAndUpdate(
      { _id: id },
      { ...updateNoteDto, updatedAt: Date.now() },
      { new: true },
    );
    return updatedNote;
  }

  async deleteNote(id: string) {
    await this.noteModel.findByIdAndRemove({ _id: id });
    return SUCCESS_DELETE_TEXT(id);
  }
}
