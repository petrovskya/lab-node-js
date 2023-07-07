import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { GreetingsModule } from 'api/greetings';
import { NotesModule } from 'api/notes';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env' }),
    MongooseModule.forRoot(String(process.env.DATABASE_URL)),
    GreetingsModule,
    NotesModule,
  ],
})
export class AppModule {}
