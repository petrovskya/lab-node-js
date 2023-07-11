import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { GreetingsModule } from 'api/greetings';
import { NotesController, NotesModule } from 'api/notes';
import { ENVIRONMENT_PATH } from 'config/constants';
import { LoggerMiddleware } from 'middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ENVIRONMENT_PATH }),
    MongooseModule.forRoot(String(process.env.DATABASE_URL)),
    GreetingsModule,
    NotesModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(NotesController);
  }
}
