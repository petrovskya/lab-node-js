import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { PARAMS, ROUTES, SUB_ROUTES } from 'config/constants';

import { CreateNoteDto, UpdateNoteDto } from './dto';
import { NotesService } from './notes.service';

@Controller(ROUTES.API)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get(SUB_ROUTES.NOTES)
  getAllNotes(@Res({ passthrough: true }) res: Response) {
    res.status(HttpStatus.OK);
    return this.notesService.getAllNotes();
  }

  @Post(SUB_ROUTES.NOTES)
  createNote(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.createNote(createNoteDto);
  }

  @Put(SUB_ROUTES.NOTE_BY_ID)
  updateNote(
    @Body() updateNoteDto: UpdateNoteDto,
    @Param(PARAMS.ID) id: string,
  ): UpdateNoteDto {
    return this.notesService.updateNote(updateNoteDto, id);
  }

  @Delete(SUB_ROUTES.NOTE_BY_ID)
  deleteNote(@Param(PARAMS.ID) id: string) {
    return this.notesService.deleteNote(id);
  }
}
