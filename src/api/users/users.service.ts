import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SUCCESS_DELETE_TEXT } from 'config/constants';

import { User, UserDocument } from './entities';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUsers(): Promise<UserDocument[]> {
    return await this.userModel.find().exec();
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async getUserById(id: string): Promise<UserDocument> {
    return await this.userModel.findById(id);
  }

  async getUserByEmail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email }).exec();
  }

  async updateUser(
    updateUserDto: UpdateUserDto,
    id: string,
  ): Promise<UserDocument> {
    return await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async deleteUser(id: string) {
    await this.userModel.findByIdAndUpdate({ _id: id }, { isDeleted: true });
    return SUCCESS_DELETE_TEXT(id);
  }
}
