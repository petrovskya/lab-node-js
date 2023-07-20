import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { PARAMS, ROUTES, SUB_ROUTES } from 'config/constants';
import { AccessTokenGuard } from 'guards';

import { CreateUserDto, UpdateUserDto } from './dto';
import { UsersService } from './users.service';

@Controller(ROUTES.API)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(SUB_ROUTES.USERS)
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Get(SUB_ROUTES.USER_BY_ID)
  async getUserById(@Param(PARAMS.ID) id: string) {
    return await this.usersService.getUserById(id);
  }

  @Get(SUB_ROUTES.USER_BY_EMAIL)
  async getUserByEmail(@Param(PARAMS.EMAIL) email: string) {
    return await this.usersService.getUserByEmail(email);
  }

  @Post(SUB_ROUTES.USERS)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(SUB_ROUTES.USER_BY_ID)
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param(PARAMS.ID) id: string,
  ) {
    return await this.usersService.updateUser(updateUserDto, id);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(SUB_ROUTES.USER_BY_ID)
  async deleteNote(@Param(PARAMS.ID) id: string) {
    return await this.usersService.deleteUser(id);
  }
}
