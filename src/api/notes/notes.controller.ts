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

import {
  APP_ENVIRONMENT,
  PARAMS,
  ROUTES,
  SUB_ROUTES,
  UNKNOWN_ENVIRONMENT,
} from 'config/constants';
import { AccessTokenGuard } from 'guards';

import { CreateNoteDto, NotesDto, UpdateNoteDto } from './dto';
import { NotesService } from './notes.service';
import { ConfigService } from '@nestjs/config';
import { addEnvironmentFlag } from 'utils';

@Controller(ROUTES.API)
export class NotesController {
  constructor(
    private readonly notesService: NotesService,
    private configService: ConfigService,
  ) {}

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
    const { title, content } = createNoteDto;

    const appEnvironment = this.configService.get(APP_ENVIRONMENT);

    const titleWithFlag = addEnvironmentFlag(appEnvironment, title);

    if (titleWithFlag instanceof Error) throw new Error(UNKNOWN_ENVIRONMENT);

    return await this.notesService.createNote({
      title: titleWithFlag,
      content,
    });
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
