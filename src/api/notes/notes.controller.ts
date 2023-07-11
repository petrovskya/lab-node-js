import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { PARAMS, ROUTES, SUB_ROUTES } from 'config/constants';
import { getResponseError } from 'utils';

import { CreateNoteDto, UpdateNoteDto } from './dto';
import { NotesService } from './notes.service';

@Controller(ROUTES.API)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get(SUB_ROUTES.NOTES)
  async getAllNotes() {
    try {
      return await this.notesService.getAllNotes();
    } catch (error) {
      getResponseError(error);
    }
  }

  @Post(SUB_ROUTES.NOTES)
  async createNote(@Body() createNoteDto: CreateNoteDto) {
    try {
      return await this.notesService.createNote(createNoteDto);
    } catch (error) {
      getResponseError(error, error.message);
    }
  }

  @Put(SUB_ROUTES.NOTE_BY_ID)
  async updateNote(
    @Body() updateNoteDto: UpdateNoteDto,
    @Param(PARAMS.ID) id: string,
  ) {
    try {
      return await this.notesService.updateNote(updateNoteDto, id);
    } catch (error) {
      getResponseError(error, error.message);
    }
  }

  @Delete(SUB_ROUTES.NOTE_BY_ID)
  async deleteNote(@Param(PARAMS.ID) id: string) {
    try {
      return await this.notesService.deleteNote(id);
    } catch (error) {
      getResponseError(error);
    }
  }
}
