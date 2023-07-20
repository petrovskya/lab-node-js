import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { PARAMS, ROUTES, SUB_ROUTES } from 'config/constants';

import { CreateNoteDto, NotesDto, UpdateNoteDto } from './dto';
import { NotesService } from './notes.service';
import { AccessTokenGuard } from 'guards';

@Controller(ROUTES.API)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @UseGuards(AccessTokenGuard)
  @Get(SUB_ROUTES.NOTES)
  async getAllNotes(@Query() params: NotesDto) {
    return await this.notesService.getAllNotes(params);
  }

  @UseGuards(AccessTokenGuard)
  @Get(SUB_ROUTES.NOTE_BY_ID)
  async getNoteById(@Param(PARAMS.ID) id: string) {
    return await this.notesService.getNoteById(id);
  }

  @UseGuards(AccessTokenGuard)
  @Post(SUB_ROUTES.NOTES)
  async createNote(@Body() createNoteDto: CreateNoteDto) {
    return await this.notesService.createNote(createNoteDto);
  }

  @UseGuards(AccessTokenGuard)
  @Put(SUB_ROUTES.NOTE_BY_ID)
  async updateNote(
    @Body() updateNoteDto: UpdateNoteDto,
    @Param(PARAMS.ID) id: string,
  ) {
    return await this.notesService.updateNote(updateNoteDto, id);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(SUB_ROUTES.NOTE_BY_ID)
  async deleteNote(@Param(PARAMS.ID) id: string) {
    return await this.notesService.deleteNote(id);
  }
}
